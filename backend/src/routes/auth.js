import { Router } from "express";
import { checkSchema } from "express-validator";
import { validateSchema } from "../middlewares/validation.js";
import { login } from "../services/auth.js";
import { authGuard } from "../middlewares/authGuard.js";

const router = Router();

// Get user from session
router.get("/", authGuard, (req, res) => {
    const { user } = req.session;
    return res.json(user);
});

const loginSchema = checkSchema({
    username: {
        notEmpty: true
    },
    password: {
        notEmpty: true
    }
});

// Verify if user exists and the password is valid - LOGIN
router.post("/", [loginSchema, validateSchema], async (req, res) => {
    const { username, password } = req.body;
    const user = await login(username, password);

    if (!user) {
        return res.status(401).send();
    }

    // Store user in session
    req.session.user = user;
    res.send();
});

// Remove user session - LOGOUT
router.delete("/", (req, res) => {
    req.session.user = null;
    res.send();
});

export default router;