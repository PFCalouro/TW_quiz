import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  answers: {
    type: Array,  // tipo de dados que se guarda
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Score = mongoose.model('Score', scoreSchema);

export default Score;
