export type CreateExercisesInput = {
  name: string;
  text: string;
  type: string;
  variantes: unknown[];
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
