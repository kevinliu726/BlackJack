const Query = {
  async nameExist(parent, args, context, info) {
    const { db } = context;
    const { name } = args;
    const exist = await db.UserModel.findOne({ name });
    console.log("someone query nameExist");
    if (exist) return true;
    else return false;
  },
  async isLogIn(parent, args, context, info) {
    const { db } = context;
    const { name, password } = args;
    const exist = await db.UserModel.findOne({ name });
    console.log("someoe query log in");
    if (exist) return exist.password === password;
    else return false;
  },
  async getLobby(parent, args, context, info) {
    const { roomType } = args;
    const { rooms } = context;
    const sortRooms = [...rooms]
            .map(([roomID, room]) => room)
            .filter(r => r.roomInfo.roomType === roomType)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    return sortRooms;
  },
  async enterRoom(parent, { roomID }, { rooms }, info) {
    return rooms.get(roomID);
  },
};

export default Query;
