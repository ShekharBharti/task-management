const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    description: {
        type: String
    }
},
{
    versionKey: false,
    timestamps: true
})

let taskModel = mongoose.model('task', taskSchema);
module.exports = taskModel;