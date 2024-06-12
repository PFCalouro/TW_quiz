import { Router } from "express";
import { checkSchema } from "express-validator";
import { authGuard } from "../middlewares/authGuard.js";
import { validateSchema } from "../middlewares/validation.js";
import { getQuestions } from "../services/question.js";
const router = Router();

const gameStartSchema = checkSchema({
    difficulty: {
        notEmpty: true,
        isInt: {
            min: 1,
            max: 3
        }
    },
    sampleSize: {
        isInt: {
            min: 1,
            max: 20
        },
        default: 20
    },
    soloGameType: {
        notEmpty: true,
        isBoolean: true
    }
});

// START GAME
// QUERY: Difficulty
// QUERY: GameType (Solo or Team)

router.post("/", [authGuard, gameStartSchema, validateSchema], async (req, res) => {
    const { difficulty, soloGameType, sampleSize } = req.body;
    const questions = await getQuestions(difficulty, sampleSize);

    return res.json({ difficulty, soloGameType, questions });
});

export default router;