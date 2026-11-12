import { lessonTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { db } from "..";
import { CreateLessonInput } from "../types/lessons";
import { updateLessonInput } from "../types/lessons";

export async function registerLesson(lessonData: CreateLessonInput) {
  const { name, description, list, creatorId } = lessonData;
  const lesson: typeof lessonTable.$inferInsert = {
    name: name,
    description: description,
    list: list,
    creatorId: creatorId,
  };
  await db.insert(lessonTable).values(lesson);
  return "Succes";
}
export async function getAllLessons() {
  const lesson = await db.query.lessonTable.findMany({
    columns: {
      id: true,
      name: true,
      description: true,
      list: true,
      creatorId: true,
    },
  });
  return lesson;
}

export async function getLessonById(id: string) {
  const lesson = await db.query.lessonTable.findFirst({
    where: eq(lessonTable.id, id),
    columns: {
      id: true,
      name: true,
      description: true,
      list: true,
      creatorId: true,
    },
  });
  return lesson;
}

export async function updateLesson(id: string, data: updateLessonInput) {
  const updatedLesson = await db
    .update(lessonTable)
    .set(data)
    .where(eq(lessonTable.id, id))
    .returning();
  return updatedLesson[0];
}

export async function deleteLesson(id: string) {
  await db.delete(lessonTable).where(eq(lessonTable.id, id)).returning({ id: lessonTable.id });
}
