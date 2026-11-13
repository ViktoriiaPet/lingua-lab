import { assignmentTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { db } from "..";
import { CreateAssignmentInput } from "../types/assignment";
import { updateAssignmentInput } from "../types/assignment";

export async function registerAssignment(assignmentData: CreateAssignmentInput) {
  const { teacherId, studentId, exerciseId, assignedStatus } = assignmentData;
  const assignment: typeof assignmentTable.$inferInsert = {
    teacherId: teacherId,
    studentId: studentId,
    exerciseId: exerciseId,
    assignedStatus: assignedStatus,
  };
  await db.insert(assignmentTable).values(assignment);
  return "Succes";
}
export async function getAllAssignment() {
  const assignment = await db.query.assignmentTable.findMany({
    columns: {
      id: true,
      teacherId: true,
      studentId: true,
      exerciseId: true,
      assignedStatus: true,
    },
  });
  return assignment;
}

export async function getAssignmentById(id: string) {
  const assignment = await db.query.assignmentTable.findFirst({
    where: eq(assignmentTable.id, id),
    columns: {
      teacherId: true,
      studentId: true,
      exerciseId: true,
      assignedStatus: true,
    },
  });
  return assignment ?? null;
}

export async function updateAssignment(id: string, data: updateAssignmentInput) {
  const updatedAssignment = await db
    .update(assignmentTable)
    .set(data)
    .where(eq(assignmentTable.id, id))
    .returning();
  return updatedAssignment[0];
}

export async function deleteAssignment(id: string) {
  await db
    .delete(assignmentTable)
    .where(eq(assignmentTable.id, id))
    .returning({ id: assignmentTable.id });
}
