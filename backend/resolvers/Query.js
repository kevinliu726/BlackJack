const Query = {
    async nameExist(parent, args, context, info){
        const {db} = context;
        const {name} = args;
        const exist = await db.UserModel.findOne({name});
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
    }
}

export default Query;