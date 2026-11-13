export type CreateAssignmentInput = {
  teacherId: string;
  studentId: string;
  exerciseId: string;
  assignedStatus: "assigned" | "completed" | "cancelled" | "hidden";
};

export type requestGetAssignmentType = {
  id: string;
};

export type updateAssignmentInput = {
  assignedStatus: "assigned" | "completed" | "cancelled" | "hidden";
};
