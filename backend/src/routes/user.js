import { Router } from "express";
import { create, getAllUsers, getUser, remove } from "../services/user.js";
import { checkSchema } from "express-validator";
import { UserExistError } from "../errors/user.js";
import { validateSchema } from "../middlewares/validation.js";

const router = Router();

router.get("/", async (req, res) => {
    const result = await getAllUsers();
    if (!result || result.length <= 0) {
        return res.status(204).send();
    }
    return res.json(result);
});

router.get("/:username", async (req, res) => {
    const { username } = req.params;

    const user = await getUser(username);
    if (!user) {
        return res.status(204).send();
    }
    delete user["passwordHash"];
    return res.json(user);
});

router.delete("/:username", async (req, res) => {
    const { username } = req.params;
    await remove(username);
    return res.send();
});

const userSchema = checkSchema({
    username: {
        errorMessage: 'Invalid username'
    },
    email: {
        errorMessage: 'Invalid email',
        isEmail: true
    },
    firstName: {
        errorMessage: 'Invalid first name'
    },
    lastName: {
        errorMessage: 'Invalid last name'
    },
    password: {
        errorMessage: 'Invalid password',
        isStrongPassword: false,
        isLength: {
            options: { min: 5 },
            errorMessage: 'Password should be at least 5 chars',
        },
    }
});

router.post("/", [userSchema, validateSchema], async (req, res) => {
    try {
        return res.json(await create(req.body));
    } catch (err) {
        if (err instanceof UserExistError) {
            return res.status(409).send(err.message);
        }
        return res.status(400).json(err);
    }
});

export default router;







// import { Router } from "express";
// import { create, getAllUsers, getUser, remove } from "../services/user.js";
// import { checkSchema } from "express-validator";
// import { UserExistError } from "../errors/user.js";
// import { validateSchema } from "../middlewares/validation.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
//
// const router = Router();
// // Rota temporária para criar um user de teste
// router.post("/create-test-user", async (req, res) => {
//     const username = "testuser";
//     const email = "testuser@example.com";
//     const password = "password";
//     const passwordHash = await bcrypt.hash(password, 10);
//
//     try {
//         const user = await User.create({
//             username,
//             email,
//             firstName: "Test",
//             lastName: "User",
//             passwordHash
//         });
//         return res.json(user);
//     } catch (err) {
//         if (err instanceof UserExistError) {
//             return res.status(409).send(err.message);
//         }
//         return res.status(400).json(err);
//     }
// });
// router.get("/", async (req, res) => {
//     const result = await getAllUsers();
//     if (!result || result.length <= 0) {
//         return res.status(204).send();
//     }
//     return res.json(result);
// });
//
// router.get("/:username", async (req, res) => {
//     const { username } = req.params;
//
//     const user = await getUser(username);
//     if (!user) {
//         return res.status(204).send();
//     }
//     delete user["passwordHash"];
//     return res.json(user);
// });
//
// router.delete("/:username", async (req, res) => {
//     const { username } = req.params;
//     await remove(username);
//     return res.send();
// });
//
// router.post("/login", async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ where: { username } });
//
//     if (!user) {
//         return res.status(401).send("Invalid username or password");
//     }
//
//     const validPassword = await bcrypt.compare(password, user.passwordHash);
//     if (!validPassword) {
//         return res.status(401).send("Invalid username or password");
//     }
//
//     const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     return res.json({ token, user: { username: user.username, email: user.email } });
// });
//
// const userSchema = checkSchema({
//     username: {
//         errorMessage: 'Invalid username'
//     },
//     email: {
//         errorMessage: 'Invalid email',
//         isEmail: true
//     },
//     firstName: {
//         errorMessage: 'Invalid first name'
//     },
//     lastName: {
//         errorMessage: 'Invalid last name'
//     },
//     password: {
//         errorMessage: 'Invalid password',
//         isStrongPassword: false,
//         isLength: {
//             options: { min: 5 },
//             errorMessage: 'Password should be at least 5 chars',
//         },
//     }
// });
//
// router.post("/register", [userSchema, validateSchema], async (req, res) => {
//     try {
//         const { username, email, firstName, lastName, password } = req.body;
//         const passwordHash = await bcrypt.hash(password, 10);
//
//         const user = await create({
//             username,
//             email,
//             firstName,
//             lastName,
//             passwordHash
//         });
//
//         return res.json(user);
//     } catch (err) {
//         if (err instanceof UserExistError) {
//             return res.status(409).send(err.message);
//         }
//         return res.status(400).json(err);
//     }
// });
//
// router.get("/me", async (req, res) => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//         return res.status(401).send("Unauthorized");
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await getUser(decoded.id);
//         if (!user) {
//             return res.status(404).send("User not found");
//         }
//         delete user["passwordHash"];
//         return res.json(user);
//     } catch (err) {
//         return res.status(401).send("Unauthorized");
//     }
// });
//
// export default router;
