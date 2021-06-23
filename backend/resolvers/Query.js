const Query = {
    async nameExist(parent, args, context, info){
        const {db} = context;
        const {name} = args;
        const exist = await db.UserModel.findOne({name});
        console.log("someone query nameExist");
        if(exist) return true;
        else return false;
    },
    async isLogIn(parent, args, context, info){
        const {db} = context;
        const {name, password} = args;
        const exist = await db.UserModel.findOne({name});
        console.log("someoe query log in");
        if(exist) return exist.password === password;
        else return false;
    },
    async getLobby(parent, args, context, info){
        const {roomType} = args;
        const {db} = context;
        const roomsInfo = [];
        await db.RoomModel.find({"roomInfo.roomType": roomType}, function(err, rooms){
            rooms.forEach(room => {
                roomsInfo.push(room.roomInfo)
            });
        });
        return roomsInfo;
    },
    async enterRoom(parent, {roomID}, {db}, info){
        const room = await db.RoomModel.findOne({roomID});
        const playerModels = await Promise.all(room.players.map(async (_id, index) => await db.PlayerModel.findById(_id)));
        return {...room, players: playerModels};
    }
}

export default Query;