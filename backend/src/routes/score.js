import express from 'express';
import Score from '../models/score.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/', async (req, res) => {
  const { score, difficulty, username, answers } = req.body;

  try {
    const newScore = new Score({
      username,
      score,
      difficulty,
      answers,
      createdAt: new Date()
    });
    await newScore.save();
    res.status(201).json({ message: 'Score saved successfully' });
    console.log('Score saved:', newScore);
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ message: 'Error saving score' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const scores = await Score.find().sort({ createdAt: -1 });
    res.json(scores);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ message: 'Error fetching scores' });
  }
});

router.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const scores = await Score.find({ username }).sort({ createdAt: -1 });
    res.json(scores);
  } catch (error) {
    console.error('Error fetching user scores:', error);
    res.status(500).json({ message: 'Error fetching user scores' });
  }
});

export default router;
