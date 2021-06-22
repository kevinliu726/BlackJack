import mongoose from "mongoose";
const {Schema} = mongoose;

const PlayerSchema = new Schema({
    name: String,
    index: Number,
    state: String,
    isBank: Boolean,
    isBattled: Boolean,
    canStand: Boolean,
    canHit: Boolean,
    canBlackJack: Boolean,
    cash: Number,
    bet: Number,
    cards: [{
        visible: Boolean,
        number: Number,
    }],
    resultType: String,
    resultTimes: Number,
})

const PlayerModel = mongoose.model("Player", PlayerSchema);

export default PlayerModel;