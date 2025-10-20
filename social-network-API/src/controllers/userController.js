import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  async signup(req, res) {
    let { name, surname, username, password } = req.body;
    try {
      password = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        surname,
        username,
        password,
      });
      return res.status(201).send({ ok: true, _id: user._id });
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }

  async login(req, res) {
    let { username, password } = req.body;
    username = username.trim().toLowerCase();
    if (!username || !password.trim()) {
      return res.status.send({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({
      username: username,
    });

    if (!user) {
      return res
        .status(404)
        .send({ message: `${username} username not found` });
    }

    const { _id, password: hashedPassword } = user;
    if (!(await bcrypt.compare(password, hashedPassword))) {
      return res.status(400).send({ message: "Wrong Credential" });
    }

    const secret = process.env.SECRET_KEY;
    const payload = {
      username,
      _id,
    };

    const token = jwt.sign(payload, secret);
    res.send({ message: "Login successfull", token: token });
  }

  async getUser(req, res) {
    const { _id } = req.user;
    const user = await User.findById(_id, { password: 0 });
    res.send({ message: "ok", payload: user });
  }

  async changeUsername(req, res) {
    let { username: newUsername, password } = req.body;
    const { _id } = req.user;

    newUsername = newUsername.trim().toLowerCase();

    if (!newUsername || !password.trim()) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }

    const user = await User.findById(_id);

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ message: "Wrong password" });
    }

    const existingUser = await User.findOne({ username: newUsername });
    if (existingUser) {
      return res.status(400).send({ message: "username is busy" });
    }
    try {
      await User.updateOne({ _id: _id }, { $set: { username: newUsername } });
      res.send({ message: "Username successfully changed" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
}

export default new UserController();
