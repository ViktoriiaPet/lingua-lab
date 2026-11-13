import { FastifyPluginAsync } from "fastify";
import { CreateExercisesInput } from "../../types/exercises";
import { requestGetExercisesType } from "../../types/exercises";
import { updateExercisesInput } from "../../types/exercises";
import {
  registerExercises,
  getAllExercise,
  getExerciseById,
  updateExercise,
  deleteExercise,
} from "../../services/exercises";

const schema = {
  body: {
    type: "object",
    required: ["name", "text", "type", "variantes"],
    properties: {
      name: { type: "string" },
      text: { type: "string" },
      type: { type: "string" },
      variantes: {
        type: "array",
        minItems: 1,
      },
    },
  },
};

const exercises: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    const result = await getAllExercise();
    return { result };
  });

  fastify.post<{ Body: CreateExercisesInput }>("/", { schema }, async function (request, reply) {
    const data = request.body;
    const result = await registerExercises(data);
    return { result };
  });

  fastify.get<{ Params: requestGetExercisesType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    const result = await getExerciseById(id);
    return result ?? reply.code(404);
  });

  fastify.patch<{ Params: requestGetExercisesType; Body: updateExercisesInput }>(
    "/:id",
    {
      schema: {
        body: {
          type: "object",
          minProperties: 1,
          properties: {
            name: { type: "string" },
            text: { type: "string" },
            type: { type: "string" },
            variantes: {
              type: "array",
              minItems: 1,
            },
          },
        },
      },
    },
    async function (request, reply) {
      const { id } = request.params;
      const updateData = request.body;
      const result = await updateExercise(id, updateData);
      return { result };
    },
  );

  fastify.delete<{ Params: requestGetExercisesType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    const result = await deleteExercise(id);
    return { result };
  });
};

export default exercises;
