import express from "express";
import { Question, QuestionType } from "../models/question.js";
import { getAllQuestions, getQuestions, seedQuestions, seedQuestionTypes } from "../services/question.js";

const router = express.Router();

// Criar um novo tipo de pergunta
router.post('/type', async (req, res) => {
    const { description } = req.body;

    try {
        const questionType = await QuestionType.create({ description });
        res.status(201).json(questionType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Criar uma nova pergunta
router.post('/', async (req, res) => {
    const { description, difficulty, type, options } = req.body;

    try {
        const question = await Question.create({ description, difficulty, type, options });
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Obter perguntas por dificuldade
router.get('/:difficulty/:sampleSize', async (req, res) => {
    const { difficulty, sampleSize } = req.params;
    try {
        const questions = await getQuestions(parseInt(difficulty), parseInt(sampleSize));
        res.json(questions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get("/", async (req, res) => {
    const { difficulty } = req.query;

    let difficultyLevel;
    if (difficulty === 'Easy') {
        difficultyLevel = 1;
    } else if (difficulty === 'Medium') {
        difficultyLevel = 2;
    } else if (difficulty === 'Hard') {
        difficultyLevel = 3;
    } else {
        return res.status(400).send("Invalid difficulty level");
    }

    try {
        const questions = await Question.find({ difficulty: difficultyLevel });
        res.json(questions);
    } catch (error) {
        res.status(500).send("Error fetching questions");
    }
});

// // Listar todas as perguntas
// router.get('/', async (req, res) => {
//     try {
//         const questions = await getAllQuestions();
//         res.json(questions);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

export default router;
