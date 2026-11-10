export type CreateAssignmentInput = {
  teacherId: string;
  studentId: string;
  exerciseId: string;
};

export type requestGetAssignmentType = {
  id: string;
};

export type updateAssignmentInput = {
  status?: "assigned" | "completed" | "cancelled" | "hidden";
};
