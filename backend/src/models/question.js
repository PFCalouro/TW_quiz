import mongoose from "mongoose";

const { Schema } = mongoose;
const StringRequiredType = {
    type: String,
    required: true
}

export const BooleanQuestionType = "boolean";
export const BlanksQuestionType = "blanks";
export const OneValidQuestionType = "oneValid";
export const MultipleValidQuestionType = "multipleValid";

const questionTypeSchema = new Schema({
    description: StringRequiredType,
    questions: [{ type: Schema.Types.ObjectId, ref: "questions" }]
});

const questionSchema = new Schema({
    description: StringRequiredType,
    difficulty: {
        type: Number,
        required: true,
        min: [1, "Question difficulty should be greater than 0"],
        max: [3, "Question difficulty should be equal or less than 3"],
    },
    type: { type: Schema.Types.ObjectId, ref: "questionTypes", required: true },
    options: [{
        value: StringRequiredType,
        correct: {
            type: Boolean,
            default: false
        }
    }]
});

export const Question = mongoose.model("questions", questionSchema);
export const QuestionType = mongoose.model("questionTypes", questionTypeSchema);



