import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
class LoginTools {
  tokenGeneration(userData) {
    const payload = {
      name: userData.name,
      id: userData.id,
    };
    const key = process.env.SECRET_KEY;
    const token = jwt.sign(payload, key);
    return token;
  }

  async passwordCheck(inputData, userData) {
    const result = await bcrypt.compare(inputData.password, userData.password);
    if (!result)
      return {
        access: false,
        error: "Invalid credentials",
      };
    else {
      return { access: true };
    }
  }
}

export default new LoginTools();
