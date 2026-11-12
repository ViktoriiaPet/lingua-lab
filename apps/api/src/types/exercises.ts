export type CreateExercisesInput = {
  name: string;
  text: string;
  type: string;
  variantes: unknown[];
  creatorId: string;
};
export type requestGetExercisesType = {
  id: string;
};

export type updateExercisesInput = {
  name?: string;
  text?: string;
  type?: string;
  variantes?: unknown[];
};
