import bcrypt from "bcrypt";
import User from "../models/user.js";
import { UserExistError } from "../errors/user.js";

/* FROM DATABASE */

// Get all users
export async function getAllUsers() {
    return await User.findAll();
}

// Get user by username
export async function getUser(username) {
    return await User.findByPk(username);
}

function generatePasswordHash(password) {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
        // Generate password hash
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                return reject(err);
            }
            return resolve(hash);
        });
    });
}

// Create user
export async function create(user) {
    const passwordHash = await generatePasswordHash(user.password);
    delete user["password"];

    const newUser = new User({
        ...user,
        passwordHash: passwordHash
    });

    try {
        await newUser.save();
    } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            throw new UserExistError();
        }
    }

    return newUser;
}

// Update user
function update(username, updatedUser) {
    // TODO
}

// Delete user
export async function remove(username) {
    const user = await getUser(username);
    if (user) {
        await user.destroy();
    }
}
