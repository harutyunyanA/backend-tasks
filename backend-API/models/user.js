import sequelize from "../db/config.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    signUpDate: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "users" }
);

export default User;
