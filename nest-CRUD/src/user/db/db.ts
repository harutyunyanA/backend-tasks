import { readFile, writeFile } from 'fs/promises';
import { IUser } from '../types';

export async function getAllUsers() {
  const users = await readFile('./src/user/db/users.json', 'utf-8');
  if (!users) return [];
  return JSON.parse(users);
}

export async function addUser(user: IUser) {
  const users = await getAllUsers();
  users.push(user);
  await writeFile('./src/user/db/users.json', JSON.stringify(users));
}

export async function addAllUsers(users: IUser[]) {
  await writeFile('./src/user/db/users.json', JSON.stringify(users));
}

export async function getUserByLogin(login: string) {
  const users = await getAllUsers();
  const user = users.find((user) => user.login == login);
  return user;
}
export async function getUserById(id: number) {
  const users = await getAllUsers();
  const user = users.find((user) => user.id == id);
  return user;
}

export async function deleteUserByID(id: number) {
  let users = await getAllUsers();
  users = users.filter((user) => user.id != id);
  await addAllUsers(users);
}
