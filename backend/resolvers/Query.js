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
      .filter((r) => r.roomInfo.roomType === roomType)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    return sortRooms;
  },
  async getRoom(parent, { roomID }, { rooms }, info) {
    console.log(roomID);
    return rooms.get(roomID);
  },
  async getRoomHistory(parent, { name }, { db }, info) {
<<<<<<< HEAD
    const user = await db.UserModel.findOne({ name }).populate("history");
    console.log("gotcha");
=======
    console.log(name);
    const user = await db.UserModel.findOne({ name }).populate("history");
    console.log(name);
>>>>>>> d6d08636e031ba19c05ea98b1e1a2265a19f6a8f
    return user.history.sort((a, b) => new Date(a.date) - new Date(b.data));
  },
  async getBattleHistory(parent, { name, roomID }, { db }, info) {
    const battles = await db.BattleHistoryModel.find({ roomID, $or: [{ "bank.name": name }, { "player.name": name }] });
    return battles.sort((a, b) => new Date(a.date) - new Date(b.date));
  },
};

export default Query;
