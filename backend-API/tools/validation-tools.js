import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

class ValidationTools {
  availabilityOfCredentials(data) {
    const { name, surname, login, password } = data;
    if (!name || !surname || !login || !password) {
      return { valid: false, message: "All fields are required" };
    }
    return { valid: true };
  }

  credentialsValidation(data) {
    const { name, surname, login, password } = data;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof surname !== "string" ||
      !surname.trim() ||
      typeof login !== "string" ||
      !login.trim() ||
      typeof password !== "string" ||
      !password.trim()
    ) {
      return {
        valid: false,
        message:
          "Wrong credentials type. Expected name='string', surname='string', login='string', password='string'.",
      };
    }

    const regExp = /[a-zA-Z]/;
    if (!regExp.test(name) || !regExp.test(surname)) {
      return {
        valid: false,
        message: "Name and surname should contain at least one letter",
      };
    }

    return { valid: true };
  }

  passwordValidation(data) {
    const password = data.password;
    if (!password || typeof password !== "string") {
      return {
        valid: false,
        message: "Password is required and should be a string",
      };
    }

    const trimmed = password.trim();
    const regExp =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!regExp.test(trimmed)) {
      return {
        valid: false,
        message:
          "Weak password. Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
      };
    }

    return { valid: true };
  }

  async loginValidation(data) {
    const user = await User.findOne({ where: { login: data.login.trim() } });
    if (user) {
      return { valid: false, message: "Login already exists" };
    }
    return { valid: true };
  }
  
}

export default new ValidationTools();
