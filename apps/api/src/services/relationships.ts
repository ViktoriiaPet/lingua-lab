import { relationshipTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { db } from "..";
import { CreateRelationshipInput } from "../types/relationships";
import { updateRelationshipInput } from "../types/relationships";

export async function registerRelationship(relationshipData: CreateRelationshipInput) {
  const { teacherId, studentId, relationshipStatus } = relationshipData;
  const relationship: typeof relationshipTable.$inferInsert = {
    teacherId: teacherId,
    studentId: studentId,
    relationshipStatus: relationshipStatus,
  };
  await db.insert(relationshipTable).values(relationship);
  return "Succes";
}
export async function getAllRelationship() {
  const relationship = await db.query.relationshipTable.findMany({
    columns: {
      id: true,
      teacherId: true,
      studentId: true,
      relationshipStatus: true,
    },
  });
  return relationship;
}

export async function getRelationshipById(id: string) {
  const relationship = await db.query.relationshipTable.findFirst({
    where: eq(relationshipTable.id, id),
    columns: {
      teacherId: true,
      studentId: true,
      relationshipStatus: true,
    },
  });
  return relationship ?? null;
}

export async function updateRelationship(id: string, data: updateRelationshipInput) {
  const updatedRelationship = await db
    .update(relationshipTable)
    .set(data)
    .where(eq(relationshipTable.id, id))
    .returning();
  return updatedRelationship[0];
}

export async function deleteRelationship(id: string) {
  await db
    .delete(relationshipTable)
    .where(eq(relationshipTable.id, id))
    .returning({ id: relationshipTable.id });
}
