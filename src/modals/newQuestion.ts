import mongoose from "mongoose";

const newQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
}, { timestamps: true });

const NewQuestion = mongoose.models.newquestion || mongoose.model("newquestion", newQuestionSchema);

export default NewQuestion;
