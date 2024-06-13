import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user.js";
import questionRoutes from "./src/routes/question.js";
import quizRoutes from "./src/routes/game.js";
import scoreRoutes from "./src/routes/score.js";
import bodyParser from "body-parser";
import session from "express-session";
import authRoutes from "./src/routes/auth.js";
import { sessionStore, syncDatabase } from "./src/services/database.js";
import cors from "cors";

// Configure environment variables
dotenv.config();
const port = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Sync database models
syncDatabase();

// Start express app
const app = express();

// Setup CORS
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));

// Configure template engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Configure session
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
}));

// Configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/game", quizRoutes);
app.use("/api/score", scoreRoutes);

app.get("/", async (req, res) => {
    res.render("index", { message: "Welcome to the TW server" });
});

// Start the server on HTTP
app.listen(port, '0.0.0.0', () => {//mudou-se isso para funcionar por causa do cors
    console.log(`Server is listening on http://localhost:${port}`);
});
