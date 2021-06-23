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
        const hostPlayer = await new db.PlayerModel(util.getNewPlayer({isBank: true, name: host, index: 11})).save();
        const playerModels = new Array(12).fill(null);
        playerModels[11] = hostPlayer;
        const room = await new db.RoomModel({
            roomID: uuidv4(),
            roomInfo,
            players: playerModels,
            state: "PAUSE",
            deck: util.shuffle(roomInfo.decksNumber),
            turnPlayerIndex: 0,
        }).save();
        return {...room._doc, players: playerModels};
    },
    async chooseSeat(parent, {roomID, name, index}, {db, pubSub}, info){
        const room = await db.RoomModel.findOne({roomID});
        if(room.players[index] !== null) return false;
        const newPlayer = await new db.PlayerModel(util.getNewPlayer({isBank: false, name, index})).save();
        room.players.set(index, newPlayer._id);
        await room.save();
        return true;
    },
    async startGame(parent, {roomID}, {db, pubSub}, info){
        const room = await db.RoomModel.findOne({roomID});
        const playerModels = await Promise.all(room.players.map(async (_id, index) => await db.PlayerModel.findById(_id)));
        for(var i = 0; i < 11; ++i){
            if(playerModels[i] && playerModels[i].state === "ACTIVE"){
                playerModels[i].canBet = true;
                await playerModels[i].save();
            }
        }
        room.state = "PLAYING";
        await room.save();
        return {...room._doc, players: playerModels};
    },
    async setBet(parent, {roomID, bet, index}, {db, pubSub}, info){
        const room = await db.RoomModel.findOne({roomID});
        const playerModels = await Promise.all(room.players.map(async (_id, index) => await db.PlayerModel.findById(_id)));
        playerModels[index].canBet = false;
        playerModels[index].cash -= bet;
        playerModels[index].bet = bet;
        await playerModels[index].save();
        if(playerModels.filter(p => p && p.state === "ACTIVE").every(p => !p.canBet)) {
            // deliver cards
            for(var i = 0; i < 12; ++i){
                if(playerModels[i] && playerModels[i].state === "ACTIVE"){
                    playerModels[i].cards = [{visible: false, number: util.getCardFromDeck(room)}, {visible: true, number: util.getCardFromDeck(room)}];
                    util.setCardsState(playerModels[i]);
                    await playerModels[i].save();
                }
            }
            // check player with blackJack
            await util.findBlackJack(room, playerModels);
            // find first player
            if(room.state !== "GAMEOVER"){
                const firstPlayer = playerModels.find(p => p && p.state === "ACTIVE" && !p.isBattled);
                firstPlayer.state = "TURN";
                await firstPlayer.save();
            }
        }
        await room.save();
        return {...room._doc, players: playerModels};
    },
    async hit(parent, {roomID, index}, {db, pubSub}, info){
        const room = await db.RoomModel.findOne({roomID});
        const playerModels = await Promise.all(room.players.map(async (_id, index) => await db.PlayerModel.findById(_id)));
        playerModels[index].cards.push({visible: true, number: util.getCardFromDeck(room)});
        util.setCardsState(playerModels[index]);
        await playerModels[index].save();
        await room.save();
        return {...room._doc, players: playerModels};
    },
    async stand(parent, {roomID, index}, {db, pubSub}, info){
        const room = await db.RoomModel.findOne({roomID});
        const playerModels = await Promise.all(room.players.map(async (_id, index) => await db.PlayerModel.findById(_id)));
        playerModels[index].state = "ACTIVE";
        let next;
        for(next = index + 1; next < 12; ++next){
            if(playerModels[next] && playerModels[next].state === "ACTIVE" && !playerModels[next].isBattled)
                break;
        }
        console.log(next);
        playerModels[next].state = "TURN";
        await playerModels[next].save();
        await playerModels[index].save();
        return {...room._doc, players: playerModels};
    },
    async battle(parent, {roomID, playersIndex}, {db, pubSub}, info){
        const room = await db.RoomModel.findOne({roomID});
        const playerModels = await Promise.all(room.players.map(async (_id, index) => await db.PlayerModel.findById(_id)));
        for(const i of playersIndex){
            await util.battle(playerModels[11], playerModels[i]);
        }
        if(playerModels.filter(p => p && !p.isBank && p.state === "ACTIVE").every(p => p.isBattled)){
            room.state === "GAMEOVER";
        }
        await room.save();
        return {...room._doc, players: playerModels};
    }
}

export default Mutation;