import { v4 as uuidv4 } from "uuid";
import * as util from "../util.js";

const Mutation = {
  async register(parent, args, context, info) {
    const { db } = context;
    const { name, password } = args;
    const user = await db.UserModel.findOne({ name });
    if (user) return false;
    const newUser = await new db.UserModel({ name, password, history: [] }).save();
    return true;
  },
  async setPassword(parent, {name, password}, {db}, info){
    const user = await db.UserModel.findOne({name});
    user.password = password;
    await user.save();
    return true;
  },
  async createRoom(parent, { roomInfo }, { db, rooms, pubSub }, info) {
    const { host } = roomInfo;
    const roomID = uuidv4();
    // create RoomHistory for bank
    const user = await db.UserModel.findOne({ name: host }).exec();
    const roomHistory = await new db.RoomHistoryModel({ roomID, date: new Date(), roomInfo, battles: [] }).save();
    user.history.push(roomHistory._id);
    await user.save();
    // create Room
    roomInfo.playersNumber = 1;
    const players = new Array(12).fill(null);
    for (var i = 0; i < 12; ++i) {
      if (i === 11) players[i] = util.getNewPlayer({ isBank: true, name: host, index: i, state: "ACTIVE", cash: 0 });
      else players[i] = util.getNewPlayer({ isBank: false, name: "", index: i, state: "UNSEATED", cash: 0 });
    }
    const room = {
      roomID,
      roomInfo,
      players,
      state: "PAUSE",
      deck: util.shuffle(roomInfo.decksNumber),
      date: new Date(),
    };
    rooms.set(roomID.toString(), room);
    const sortRooms = [...rooms]
      .map(([roomID, room]) => room)
      .filter((r) => r.roomInfo.roomType === roomInfo.roomType)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    pubSub.publish(roomInfo.roomType, { subscribeLobby: sortRooms });
    pubSub.publish(`room_${roomID}`, {subscribeRoom: room});
    return room;
  },
  async chooseSeat(parent, { roomID, name, index, originalIndex }, { db, rooms, pubSub }, info) {
    const room = rooms.get(roomID);
    if (room.players[index].state !== "UNSEATED") return -1;
    // create RoomHistory
    const user = await db.UserModel.findOne({ name }).exec();
    const roomHistory = await db.RoomHistoryModel.findOne({ roomID }).exec();
    if (!user.history.includes(roomHistory._id)) user.history.push(roomHistory._id);
    await user.save();
    // add new player
    if(originalIndex >= 0){
      room.players[index] = util.getNewPlayer({ isBank: false, name, index, state: "ACTIVE", cash: room.players[originalIndex].cash });
      room.players[originalIndex] = util.getNewPlayer({ isBank: false, name: "", index: originalIndex, state: "UNSEATED", cash: 0 });
    }
    else{
      room.players[index] = util.getNewPlayer({ isBank: false, name, index, state: "ACTIVE", cash: 0 });
      room.roomInfo.playersNumber += 1;
    }
    const sortRooms = [...rooms]
      .map(([roomID, room]) => room)
      .filter((r) => r.roomInfo.roomType === room.roomInfo.roomType && r.state !== "DEAD")
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    pubSub.publish(room.roomInfo.roomType, { subscribeLobby: sortRooms });
    pubSub.publish(`room_${roomID}`, { subscribeRoom: room });
    return index;
  },
  async startGame(parent, { roomID }, { db, rooms, pubSub }, info) {
    const room = rooms.get(roomID);
    room.players.filter((p) => p.state === "ACTIVE" && !p.isBank).forEach((p) => (p.canBet = true));
    room.state = "PLAYING";
    pubSub.publish(`room_${roomID}`, { subscribeRoom: room });
    return room;
  },
  async endGame(parent, {roomID}, {rooms, pubSub}, info){
    const room = rooms.get(roomID);
    for(const p of room.players){
      p.cards = [];
      p.canBattle = true;
      p.bet = 0;
    }
    room.players[11].state = "ACTIVE";
    room.state = "PAUSE";
    pubSub.publish(`room_${roomID}`, { subscribeRoom: room });
    return room;
  },
  async setBet(parent, { roomID, bet, index }, { db, rooms, pubSub }, info) {
    const room = rooms.get(roomID);
    room.players[index].canBet = false;
    room.players[index].cash -= bet;
    room.players[index].bet = bet;
    if (room.players.filter((p) => p.state === "ACTIVE").every((p) => !p.canBet)) {
      // deliver cards
      for (const p of room.players.filter((p) => p.state === "ACTIVE")) {
        p.cards = [
          { visible: false, number: util.getCardFromDeck(room) },
          { visible: true, number: util.getCardFromDeck(room) },
        ];
        util.setCardsState(p);
      }
      // check player with blackJack
      await util.findBlackJack(room);
      // find first player
      if (room.state !== "GAMEOVER") {
        const firstPlayer = room.players.find((p) => p.state === "ACTIVE" && p.canBattle);
        firstPlayer.state = "TURN";
      }
    }
    pubSub.publish(`room_${roomID}`, { subscribeRoom: room });
    return room;
  },
  async hit(parent, { roomID, index }, { db, rooms, pubSub }, info) {
    const room = rooms.get(roomID);
    room.players[index].cards.push({ visible: true, number: util.getCardFromDeck(room) });
    util.setCardsState(room.players[index]);
    pubSub.publish(`room_${roomID}`, { subscribeRoom: room });
    return room;
  },
  async stand(parent, { roomID, index }, { db, rooms, pubSub }, info) {
    const room = rooms.get(roomID);
    room.players[index].state = "ACTIVE";
    let next;
    for (next = index + 1; next < 12; ++next) {
      if (room.players[next].state === "ACTIVE" && room.players[next].canBattle) break;
    }
    room.players[next].state = "TURN";
    if (next === 11) {
      room.players[next].cards[0].visible = true;
    }
    pubSub.publish(`room_${roomID}`, { subscribeRoom: room });
    return room;
  },
  async chooseBattlePlayer(parent, {roomID, index}, {rooms, pubSub}, info){
    const room = rooms.get(roomID);
    room.players[index].isChosen = !room.players[index].isChosen;
    pubSub.publish(`room_${roomID}`, { subscribeRoom: room });
    return room;
  },
  async battle(parent, { roomID }, { db, rooms, pubSub }, info) {
    const room = rooms.get(roomID);
    for (const p of room.players.filter(p => p.isChosen)) {
      await util.battle(room.players[11], p, roomID);
      p.isChosen = false;
    }
    if (room.players.filter((p) => p && !p.isBank && p.state === "ACTIVE").every((p) => !p.canBattle)) {
      room.state = "GAMEOVER";
      room.players[11].canStand = false;
      room.players[11].canHit = false;
    }
    pubSub.publish(`room_${roomID}`, { subscribeRoom: room });
    return room;
  },
  async battleAll(parent, {roomID}, {rooms, pubSub}, info){
    const room = rooms.get(roomID);
    for (const p of room.players.filter(p => p.state === "ACTIVE" && !p.isBank && p.canBattle)) {
      await util.battle(room.players[11], p, roomID);
      p.isChosen = false;
    }
    room.state = "GAMEOVER";
    room.players[11].canStand = false;
    room.players[11].canHit = false;
    pubSub.publish(`room_${roomID}`, { subscribeRoom: room });
    return room;
  },
  async away(parent, { roomID, index }, { db, rooms, pubSub }, info) {
    const room = rooms.get(roomID);
    room.players[index].state = "AWAY";
    pubSub.publish(`room_${roomID}`, { subscribeRoom: room });
    return room;
  },
  async back(parent, { roomID, index }, { db, rooms, pubSub }, info) {
    const room = rooms.get(roomID);
    room.players[index] = util.getNewPlayer({ isBank: false, name: room.players[index].name, index, state: "ACTIVE" });
    pubSub.publish(`room_${roomID}`, { subscribeRoom: room });
    return room;
  },
  async leave(parent, { roomID, index }, { db, rooms, pubSub }, info) {
    const room = rooms.get(roomID);
    if(index < 0) return room;
    room.players[index] = util.getNewPlayer({ isBank: false, name: "", index, state: "UNSEATED" });
    room.roomInfo.playersNumber -= 1;
    if(index === 11) room.state = "DEAD"
    if(room.roomInfo.playersNumber === 0) rooms.delete(roomID);
    const sortRooms = [...rooms]
      .map(([roomID, room]) => room)
      .filter((r) => r.roomInfo.roomType === room.roomInfo.roomType && r.state !== "DEAD")
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    pubSub.publish(room.roomInfo.roomType, { subscribeLobby: sortRooms });
    pubSub.publish(`room_${roomID}`, { subscribeRoom: room });
    return room;
  },
};

export default Mutation;
