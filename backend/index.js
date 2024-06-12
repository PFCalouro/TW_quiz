import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user.js";
import questionRoutes from "./src/routes/question.js";
import quizRoutes from "./src/routes/game.js";
import bodyParser from "body-parser";
import session from "express-session";
import authRoutes from "./src/routes/auth.js";
import { sessionStore, syncDatabase } from "./src/services/database.js";
import { faker } from '@faker-js/faker';
import cors from "cors";

// Configure environment variables
dotenv.config();
const port = process.env.PORT || 8000;

// Sync database models
syncDatabase();

// Start express app
const app = express();

// Setup CORS
app.use(cors(
    {
        credentials: true,
        origin: "http://localhost:3000",
    }
));

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
app.use(bodyParser.urlencoded());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/game", quizRoutes);

app.get("/", async (req, res) => {
    const names = [];
    for (let i = 0; i <= faker.number.int(10); i++) {
        names.push(faker.person.fullName());
    }

    res.render(
        "index",
        {
            message: "Welcome to the TW server",
            names: names
        }
    );
});

// app.get("/login", async (req, res) => {
//     res.render("login");
// });

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


// import express from "express";
// import dotenv from "dotenv";
// import userRoutes from "./src/routes/user.js";
// import questionRoutes from "./src/routes/question.js";
// import quizRoutes from "./src/routes/game.js";
// import bodyParser from "body-parser";
// import session from "express-session";
// import cors from "cors";
// import { sessionStore, syncDatabase } from "./src/services/database.js";
//
// // Configure environment variables
// dotenv.config();
// const port = process.env.PORT || 8000;
//
// // Sync database models (MySQL)
// syncDatabase();
//
// // Start express app
// const app = express();
//
// // Setup CORS
// app.use(cors({
//     credentials: true,
//     origin: "http://localhost:3000", // Certifique-se de que isso está correto
// }));
//
// // Configure template engine
// app.set('view engine', 'ejs');
// app.set('views', './src/views');
//
// // Configure session
// app.use(session({
//     secret: process.env.SECRET,
//     resave: true,
//     saveUninitialized: false,
//     store: sessionStore,
// }));
//
// // Configure body parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//
// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/questions", questionRoutes);
// app.use("/api/game", quizRoutes);
//
// app.get("/", async (req, res) => {
//     res.render("index", { message: "Welcome to the TW server" });
// });
//
// app.get("/login", async (req, res) => {
//     res.render("login");
// });
//
// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });
