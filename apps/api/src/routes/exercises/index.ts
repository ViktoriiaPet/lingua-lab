import { FastifyPluginAsync } from "fastify";
import { CreateExercisesInput } from "../../types/exercises";
import { requestGetExercisesType } from "../../types/exercises";
import { updateExercisesInput } from "../../types/exercises";

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
    return { exercises: [] };
  });

  fastify.post<{ Body: CreateExercisesInput }>("/", { schema }, async function (request, reply) {
    const data = request.body;
    const { name, text, type, variantes } = data;
    return { name, text, type, variantes };
  });

  fastify.get<{ Params: requestGetExercisesType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    return { exerciseId: [id] };
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
      return { id, updateData };
    },
  );

  fastify.delete<{ Params: requestGetExercisesType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    return { exerciseId: [id] };
  });
};

export default exercises;
