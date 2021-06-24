import { v4 as uuidv4 } from 'uuid';
import * as util from '../util.js';

const Mutation = {
    async register(parent, args, context, info){
        const {db} = context;
        const {name, password} = args;
        const user = await db.UserModel.findOne({name});
        console.log("someone register.")
        if(user) return false;
        const newUser = await new db.UserModel({name, password}).save();
        return true;
    },
    async createRoom(parent, args, context, info){
        const {db, pubSub} = context;
        const {roomInfo} = args;
        const {host} = roomInfo;
        roomInfo.playersNumber = 1;
        const players = new Array(12).fill(null);
        for(var i = 0; i < 12; ++i){
            if(i === 11) players[i] = (await new db.PlayerModel(util.getNewPlayer({isBank: true, name: host, index: i, state: "ACTIVE"})).save());
            else players[i] = (await new db.PlayerModel(util.getNewPlayer({isBank: false, name: "", index: i, state: "UNSEATED"})).save());
        }
        const room = await new db.RoomModel({
            roomID: uuidv4(),
            roomInfo,
            players,
            state: "PAUSE",
            deck: util.shuffle(roomInfo.decksNumber),
        }).save();
        pubSub.publish(roomInfo.roomType, {subscribeLobby: await db.RoomModel.find({"roomInfo.roomType": roomInfo.roomType}).select("roomInfo")});
        return await room.populate("players").execPopulate();
    },
    async chooseSeat(parent, {roomID, name, index}, {db, pubSub}, info){
        const room = await db.RoomModel.findOne({roomID});
        const seatPlayer = await db.PlayerModel.findById(room.players[index]);
        if(seatPlayer.state !== "UNSEATED") return false;
        await db.PlayerModel.deleteOne({_id: seatPlayer._id});
        const newPlayer = await new db.PlayerModel(util.getNewPlayer({isBank: false, name, index, state: "ACTIVE"})).save();
        room.players.set(index, newPlayer._id);
        room.roomInfo.playersNumber += 1;
        await room.save();
        await room.populate("players").execPopulate();
        pubSub.publish(room.roomInfo.roomType, {subscribeLobby: await db.RoomModel.find({"roomInfo.roomType": room.roomInfo.roomType}).select("roomInfo")});
        pubSub.publish(`room_${roomID}`, {subscribeRoom: room});
        return true;
    },
    async startGame(parent, {roomID}, {db, pubSub}, info){
        const room = await db.RoomModel.findOne({roomID}).populate("players").exec();
        for(const p of room.players.filter(p => p.state === "ACTIVE" && !p.isBank)){
            p.canBet = true;
            await p.save();
        }
        room.state = "PLAYING";
        await room.save();
        pubSub.publish(`room_${roomID}`, {subscribeRoom: room});
        return room;
    },
    async setBet(parent, {roomID, bet, index}, {db, pubSub}, info){
        const room = await db.RoomModel.findOne({roomID}).populate("players").exec();
        room.players[index].canBet = false;
        room.players[index].cash -= bet;
        room.players[index].bet = bet;
        await room.players[index].save();
        if(room.players.filter(p => p.state === "ACTIVE").every(p => !p.canBet)) {
            // deliver cards
            for(const p of room.players.filter(p => p.state === "ACTIVE")){
                p.cards = [{visible: false, number: util.getCardFromDeck(room)}, {visible: true, number: util.getCardFromDeck(room)}];
                util.setCardsState(p);
                await p.save();
            }
            // check player with blackJack
            await util.findBlackJack(room);
            // find first player
            if(room.state !== "GAMEOVER"){
                const firstPlayer = room.players.find(p => p.state === "ACTIVE" && !p.isBattled);
                firstPlayer.state = "TURN";
                await firstPlayer.save();
            }
        }
        await room.save();
        pubSub.publish(`room_${roomID}`, {subscribeRoom: room});
        return room;
    },
    async hit(parent, {roomID, index}, {db, pubSub}, info){
        const room = await db.RoomModel.findOne({roomID}).populate("players").exec();
        room.players[index].cards.push({visible: true, number: util.getCardFromDeck(room)});
        util.setCardsState(room.players[index]);
        await room.players[index].save();
        await room.save();
        pubSub.publish(`room_${roomID}`, {subscribeRoom: room});
        return room;
    },
    async stand(parent, {roomID, index}, {db, pubSub}, info){
        const room = await db.RoomModel.findOne({roomID}).populate("players").exec();
        room.players[index].state = "ACTIVE";
        let next;
        for(next = index + 1; next < 12; ++next){
            if(room.players[next].state === "ACTIVE" && room.players[next].canBattle)
                break;
        }
        room.players[next].state = "TURN";
        if(next === 11){
            room.players[next].cards[0].visible = true;
        }
        await room.players[next].save();
        await room.players[index].save();
        pubSub.publish(`room_${roomID}`, {subscribeRoom: room});
        return room;
    },
    async battle(parent, {roomID, playersIndex}, {db, pubSub}, info){
        const room = await db.RoomModel.findOne({roomID}).populate("players").exec();
        for(const i of playersIndex){
            await util.battle(room.players[11], room.players[i]);
        }
        if(room.players.filter(p => p && !p.isBank && p.state === "ACTIVE").every(p => p.isBattled)){
            room.state === "GAMEOVER";
        }
        await room.save();
        pubSub.publish(`room_${roomID}`, {subscribeRoom: room});
        return room;
    }
}

export default Mutation;