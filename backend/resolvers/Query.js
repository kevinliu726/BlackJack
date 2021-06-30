const Query = {
  async nameExist(parent, args, context, info) {
    const { db } = context;
    const { name } = args;
    const exist = await db.UserModel.findOne({ name });
    if (exist) return true;
    else return false;
  },
  async isLogIn(parent, args, context, info) {
    const { db } = context;
    const { name, password } = args;
    const exist = await db.UserModel.findOne({ name });
    if (exist) return exist.password === password;
    else return false;
  },
  async getLobby(parent, args, context, info) {
    const { roomType } = args;
    const { rooms } = context;
    const sortRooms = [...rooms]
      .map(([roomID, room]) => room)
      .filter((r) => r.roomInfo.roomType === roomType && r.state !== "DEAD")
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    return sortRooms;
  },
  async getRoom(parent, { roomID }, { rooms }, info) {
    return rooms.get(roomID);
  },
  async getRoomHistory(parent, { name }, { db }, info) {
    const user = await db.UserModel.findOne({ name }).populate("history");
    return user.history.sort((a, b) => new Date(a.date) - new Date(b.data));
  },
  async getBattleHistory(parent, { name, roomID }, { db }, info) {
    const battles = await db.BattleHistoryModel.find({ roomID, $or: [{ "bank.name": name }, { "player.name": name }] });
    return battles.sort((a, b) => new Date(a.date) - new Date(b.date));
  },
};

export default Query;
