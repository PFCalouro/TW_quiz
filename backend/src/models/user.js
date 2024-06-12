import dotenv from "dotenv";
import { DataTypes, Model } from "sequelize";
import Sequelize from "sequelize";

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB } = process.env;
const sequelize = new Sequelize(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}`);

class User extends Model { }
User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                const firstName = this.firstName;
                const lastName = this.lastName;
                return firstName && lastName ? `${firstName} ${lastName}` : null;
            },
        },
        passwordHash: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        }
    },
    { sequelize, modelName: 'users' },
);

export default User;
