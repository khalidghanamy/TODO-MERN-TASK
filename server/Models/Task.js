import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Todo", "In progress", "Under review", "Rework", "Completed"],
        default: "Todo"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"

    }
    ,
    startedAt: {
        type: Date,
        default: Date.now
    }
    ,
    finishedAt: {
        type: Date,
        default: Date.now +(60*60)

    }
}
);
const Task = mongoose.model("Task", taskSchema);
export default Task;