import User from "../models/user.js";
import loginTools from "../tools/login-tools.js";
import valTool from "../tools/validation-tools.js";
import bcrypt from "bcrypt";

class AuthController {
  async signup(req, res) {
    const data = req.body;

    const availability = valTool.availabilityOfCredentials(data);
    if (!availability.valid)
      return res.status(400).send({ message: availability.message });

    const credentials = valTool.credentialsValidation(data);
    if (!credentials.valid)
      return res.status(400).send({ message: credentials.message });

    const passwordCheck = valTool.passwordValidation(data);
    if (!passwordCheck.valid)
      return res.status(400).send({ message: passwordCheck.message });

    const loginCheck = await valTool.loginValidation(data);
    if (!loginCheck.valid)
      return res.status(400).send({ message: loginCheck.message });

    const hashedPassword = await bcrypt.hash(data.password.trim(), 10);

    const newUser = await User.create({
      name: data.name.trim(),
      surname: data.surname.trim(),
      login: data.login.trim(),
      password: hashedPassword,
    });

    res.status(201).send({
      message: "User successfully registered",
      payload: {
        name: newUser.name,
        surname: newUser.surname,
      },
    });
  }
  async login(req, res) {
    const { login, password } = req.body;
    if (!login || !login.trim()) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const record = await User.findOne({
      where: {
        login: login.trim(),
      },
    });

    if (!record) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const user = record.dataValues;

    const passwordCheck = await loginTools.passwordCheck(req.body, user);
    if (!passwordCheck.access) {
      return res.status(401).send({ error: passwordCheck.error });
    }

    const token = loginTools.tokenGeneration(user);

    res.status(200).send({ message: "ok", token: token });
  }

  async user(req, res) {
    const user = await User.findOne({ where: { id: req.user.id } });
    res.status(200).send({
      message: "ok",
      payload: {
        name: user.name,
        surname: user.surname,
      },
    });
  }
}

export default new AuthController();
