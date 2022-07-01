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
}
);
const Task = mongoose.model("Task", taskSchema);
export default Task;