import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  addAllUsers,
  addUser,
  deleteUserByID,
  getAllUsers,
  getUserById,
} from './db/db';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const newUser = { ...createUserDto, id: Date.now() };
    await addUser(newUser);
    return newUser;
  }

  async findAll() {
    const users = await getAllUsers();
    return users;
  }

  async findOne(id: number) {
    const users = await getAllUsers();
    const result = await users.find((user) => user.id == id);
    if (!result) {
      return { status: 404, message: 'user not found' };
    }
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let users = await getAllUsers();
    let user = users.find((user) => user.id == id);
    users = users.filter((user) => user.id != id);
    user = { ...user, name: updateUserDto.name, login: updateUserDto.login };
    users.push({
      ...user,
      name: updateUserDto.name,
      login: updateUserDto.login,
    });
    await addAllUsers(users);
    return { status: 200, payload: user };
  }

  async remove(id: number) {
    const user = getUserById(id);
    if (!user) return { status: 404, message: 'user not found' };
    deleteUserByID(id);
    return user;
  }
}
