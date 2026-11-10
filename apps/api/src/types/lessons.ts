export type CreateLessonInput = {
  name: string;
  description: string;
  list: unknown[];
};
export type requestGetLessonType = {
  id: string;
};

export type updateLessonInput = {
  name?: string;
  description?: string;
  list?: unknown[];
};
