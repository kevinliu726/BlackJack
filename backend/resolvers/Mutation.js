import { v4 as uuidv4 } from 'uuid';

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
        const hostPlayer = await new db.PlayerModel({
            name: host,
            index: 0,
            state: "ACTIVE",
            isBank: true,
            isBattled: false,
            canStand: false,
            canHit: false,
            canBlackJack: false,
            cash: 0,
            bet: 0,
            cards: [],
            resultType: "NONE",
            resultTimes: 0,
        }).save();
        const room = await new db.RoomModel({
            id: uuidv4(),
            roomInfo,
            players: [hostPlayer],
            state: "PAUSE",
            turnPlayerIndex: 0,
        }).save();
        pubSub.publish(roomInfo.roomType, {
            subscribeLobby: roomInfo
        });
        return room;
    }
}

export default Mutation;