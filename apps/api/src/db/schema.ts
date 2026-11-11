import { pgTable, varchar, pgEnum, text, jsonb, uuid } from "drizzle-orm/pg-core";

export const assignedStatus = pgEnum("status", ["assigned", "completed", "cancelled", "hidden"]);
export const relationshipStatus = pgEnum("relationshipStatus", ["pending", "active", "ended"]);
export const rolesStatus = pgEnum("rolesStatus", ["student", "teacher"]);

export const usersTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  roles: rolesStatus().array().notNull(),
  password: varchar({ length: 255 }).notNull(),
});

export const exerciseTable = pgTable("exercise", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  text: text().notNull(),
  type: varchar({ length: 255 }).notNull(),
  variantes: jsonb().notNull(),
  creatorId: uuid()
    .notNull()
    .references(() => usersTable.id),
});

export const assignmentTable = pgTable("assignment", {
  id: uuid().defaultRandom().primaryKey(),
  teacherId: uuid()
    .notNull()
    .references(() => usersTable.id),
  studentId: uuid()
    .notNull()
    .references(() => usersTable.id),
  exerciseId: uuid()
    .notNull()
    .references(() => exerciseTable.id),
  assignedStatus: assignedStatus().notNull(),
});

export const lessonTable = pgTable("lesson", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  list: jsonb().notNull(),
  creatorId: uuid()
    .notNull()
    .references(() => usersTable.id),
});

export const relationshipTable = pgTable("relationship", {
  id: uuid().defaultRandom().primaryKey(),
  teacherId: uuid()
    .notNull()
    .references(() => usersTable.id),
  studentId: uuid()
    .notNull()
    .references(() => usersTable.id),
  relationshipStatus: relationshipStatus().notNull(),
});
