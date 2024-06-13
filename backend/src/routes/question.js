import express from "express";
import { Question } from "../models/question.js";
import { getQuestions } from "../services/question.js";

const router = express.Router();

// Obter perguntas por dificuldade
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
        const question = await Question.find({ difficulty: difficultyLevel });
        res.json(question);
    } catch (error) {
        res.status(500).send("Error fetching questions");
    }
});

export default router;
