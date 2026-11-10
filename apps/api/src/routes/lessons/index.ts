import { FastifyPluginAsync } from "fastify";
import { CreateLessonInput } from "../../types/lessons";
import { requestGetLessonType } from "../../types/lessons";
import { updateLessonInput } from "../../types/lessons";

const schema = {
  body: {
    type: "object",
    required: ["name", "description", "list"],
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      list: {
        type: "array",
        minItems: 1,
      },
    },
  },
};

const lessons: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    return { lessons: [] };
  });

  fastify.post<{ Body: CreateLessonInput }>("/", { schema }, async function (request, reply) {
    const data = request.body;
    const { name, description, list } = data;
    return { name, description, list };
  });

  fastify.get<{ Params: requestGetLessonType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    return { lessonId: [id] };
  });

  fastify.patch<{ Params: requestGetLessonType; Body: updateLessonInput }>(
    "/:id",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            list: {
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

  fastify.delete<{ Params: requestGetLessonType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    return { lessonId: [id] };
  });
};

export default lessons;
