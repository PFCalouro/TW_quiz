import { BlanksQuestionType, BooleanQuestionType, MultipleValidQuestionType, OneValidQuestionType, Question, QuestionType } from "../models/question.js";

export async function getAllQuestions() {
    return await Question.find({}).populate("type");
}

export async function getQuestions(providedDifficulty, sampleSize) {
    const questions = [];

    if (providedDifficulty === 1) {
        questions.push(
            /* await Question
                .aggregate(
                    [
                        { $match: { difficulty: providedDifficulty } },
                        { $sample: { size: 20 } }
                    ]
                )
            */

            // OU

            await Question
                .aggregate()
                .match({ difficulty: providedDifficulty })
                .sample(sampleSize)
        );
    }

    return questions;
}

export async function seedQuestionTypes() {
    // True/False
    // Fill the blanks
    // Multiple choices
    // Multiple valid answers

    const types = [
        { description: BooleanQuestionType },
        { description: BlanksQuestionType },
        { description: OneValidQuestionType },
        { description: MultipleValidQuestionType },
    ]

    const questionTypeCount = await QuestionType.countDocuments();
    if (questionTypeCount == 0) {
        await QuestionType.insertMany(types);
    }
}

export async function seedQuestions() {
    // Seed question types
    await seedQuestionTypes();

    const questionCount = await Question.countDocuments();

    if (questionCount == 0) {
        // boolean question
        const booleanQuestionType = await QuestionType.findOne({ description: BooleanQuestionType });
        const blankQuestionType = await QuestionType.findOne({ description: BlanksQuestionType });
        const oneValidQuestionType = await QuestionType.findOne({ description: OneValidQuestionType });
        const multipleValidQuestionType = await QuestionType.findOne({ description: MultipleValidQuestionType });

        await Question.create({
            description: "Are you understanding anything?",
            difficulty: 1,
            type: booleanQuestionType._id,
            options: [
                {
                    value: "True",
                    correct: false
                },
                {
                    value: "False",
                    correct: true
                }
            ]
        });

        await Question.create({
            description: "$ é uma tuna da UAc",
            difficulty: 1,
            type: blankQuestionType._id,
            options: [
                {
                    value: "tunideos",
                    correct: true
                }
            ]
        });

        await Question.create({
            description: "How many islands are in the azorean archipelago?",
            difficulty: 1,
            type: oneValidQuestionType._id,
            options: [
                {
                    value: "9",
                    correct: true
                },
                {
                    value: "8",
                },
                {
                    value: "3",
                },
                {
                    value: "2",
                }
            ]
        });

        await Question.create({
            description: "Which options are valid names for the islands of the azorian archipelago?",
            difficulty: 1,
            type: multipleValidQuestionType._id,
            options: [
                {
                    value: "São Jorge",
                    correct: true
                },
                {
                    value: "Las Palmas",
                },
                {
                    value: "Menorca",
                },
                {
                    value: "Santa Maria",
                    correct: true
                }
            ]
        });
    }

}