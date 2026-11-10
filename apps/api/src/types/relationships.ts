export type CreateRelationshipInput = {
  teacherId: string;
  studentId: string;
};

export type requestGetRelationshipType = {
  id: string;
};

export type updateRelationshipInput = {
  status?: "pending" | "active" | "ended";
};
