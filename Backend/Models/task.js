const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    deadline: Date,
    priority: {
        type: String,
        enum: ["all","low","medium","high","none"],
        default: "none"
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("tasks",TaskSchema);