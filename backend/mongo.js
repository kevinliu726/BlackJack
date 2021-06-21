import UserModel from "./dbModels/UserModel.js";
import mongoose from "mongoose";
import "dotenv-defaults/config.js";


function connectMongo() {
    mongoose.connect(process.env.MONGODB_URL, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Mongo database connected!');
        deleteDb();
    });
}

const deleteDb = async () => {
    await UserModel.deleteMany({});
}

const mongo = {
    connect: connectMongo,
};

export default mongo;