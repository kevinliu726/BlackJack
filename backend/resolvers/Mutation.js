const Mutation = {
    async register(parent, args, context, info){
        const {db} = context;
        const {name, password} = args;
        const user = await db.UserModel.findOne({name});
        if(user) return false;
        const newUser = await new db.UserModel({name, password}).save();
        return true;
    }
}

export default Mutation;