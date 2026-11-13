import { exerciseTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { db } from "..";
import { CreateExercisesInput } from "../types/exercises";
import { updateExercisesInput } from "../types/exercises";

export async function registerExercises(exercisesData: CreateExercisesInput) {
  const { name, text, type, variantes, creatorId } = exercisesData;
  const exercise: typeof exerciseTable.$inferInsert = {
    name: name,
    text: text,
    type: type,
    variantes: variantes,
    creatorId: creatorId,
  };
  await db.insert(exerciseTable).values(exercise);
  return "Succes";
}
export async function getAllExercise() {
  const exercise = await db.query.exerciseTable.findMany({
    columns: {
      id: true,
      name: true,
      text: true,
      type: true,
      variantes: true,
      creatorId: true,
    },
  });
  return exercise;
}

export async function getExerciseById(id: string) {
  const exercise = await db.query.exerciseTable.findFirst({
    where: eq(exerciseTable.id, id),
    columns: {
      name: true,
      text: true,
      type: true,
      variantes: true,
      creatorId: true,
    },
  });
  return exercise ?? null;
}

export async function updateExercise(id: string, data: updateExercisesInput) {
  const updatedExercise = await db
    .update(exerciseTable)
    .set(data)
    .where(eq(exerciseTable.id, id))
    .returning();
  return updatedExercise[0];
}

export async function deleteExercise(id: string) {
  await db
    .delete(exerciseTable)
    .where(eq(exerciseTable.id, id))
    .returning({ id: exerciseTable.id });
}
