import dotenv from "dotenv";
import User from "../models/user.js";
import mongoose from "mongoose";
import { seedQuestions } from "../services/question.js";
import MySQLStore from "express-mysql-session";
import session from "express-session";

dotenv.config();

export async function syncDatabase() {
    // Create user table
    await User.sync({ force: false });

    // Create new questions if !any
    await seedQuestions();
}

/*
*           *
*   MYSQL   *
*           *
*/

// Establish connection to the database using .env credentials
const { DB, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const options = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB
};

const DBSessionStore = MySQLStore(session);
export const sessionStore = new DBSessionStore(options);

/*
*               *
*   MongoDB     *
*               *
*/

// MongoDB connection
mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
        process.exit(-2);
    });
