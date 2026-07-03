import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        default:""
    },
    content: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

export default mongoose.model("note", notesSchema);
