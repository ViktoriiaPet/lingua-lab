export type CreateLessonInput = {
  name: string;
  description: string;
  list: unknown[];
  creatorId: string;
};
export type requestGetLessonType = {
  id: string;
};

export type updateLessonInput = {
  name?: string;
  description?: string;
  list?: unknown[];
};
