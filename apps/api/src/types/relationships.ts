export type CreateRelationshipInput = {
  teacherId: string;
  studentId: string;
  relationshipStatus: "pending" | "active" | "ended";
};

export type requestGetRelationshipType = {
  id: string;
};

export type updateRelationshipInput = {
  relationshipStatus: "pending" | "active" | "ended";
};
