const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cubeSchema = Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory'}],
    creatorId: { type: Schema.Types.ObjectId, ref: 'User'},
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;