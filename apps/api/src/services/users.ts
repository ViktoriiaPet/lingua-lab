import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { db } from "..";
import argon2 from "argon2";
import { CreateUserInput } from "../types/users";
import { UpdateUserInput } from "../types/users";

export async function registerUser(userData: CreateUserInput) {
  const { name, email, roles, password } = userData;
  const hashPassword = await argon2.hash(password);
  const user: typeof usersTable.$inferInsert = {
    name: name,
    email: email,
    roles: roles,
    password: hashPassword,
  };
  await db.insert(usersTable).values(user);
  return "Succes";
}
export async function getAllUsers() {
  const users = await db.query.usersTable.findMany({
    columns: {
      id: true,
      name: true,
      email: true,
      roles: true,
    },
  });
  return users;
}

export async function getUserById(id: string) {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
    columns: {
      id: true,
      name: true,
      email: true,
      roles: true,
    },
  });
  return user;
}

export async function updateUser(id: string, data: UpdateUserInput) {
  const updatedUser = await db
    .update(usersTable)
    .set(data)
    .where(eq(usersTable.id, id))
    .returning();
  return updatedUser[0];
}

export async function deleteUser(id: string) {
  await db.delete(usersTable).where(eq(usersTable.id, id)).returning({ id: usersTable.id });
}
