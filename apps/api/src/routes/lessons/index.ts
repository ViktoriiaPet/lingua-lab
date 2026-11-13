import { FastifyPluginAsync } from "fastify";
import { CreateLessonInput } from "../../types/lessons";
import { requestGetLessonType } from "../../types/lessons";
import { updateLessonInput } from "../../types/lessons";
import {
  registerLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
} from "../../services/lessons";

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
    const result = await getAllLessons();
    return { result };
  });

  fastify.post<{ Body: CreateLessonInput }>("/", { schema }, async function (request, reply) {
    const data = request.body;
    const result = await registerLesson(data);
    return { result };
  });

  fastify.get<{ Params: requestGetLessonType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    const result = await getLessonById(id);
    return result ?? reply.code(404);
  });

  fastify.patch<{ Params: requestGetLessonType; Body: updateLessonInput }>(
    "/:id",
    {
      schema: {
        body: {
          type: "object",
          minProperties: 1,
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
      const result = await updateLesson(id, updateData);
      return { result };
    },
  );

  fastify.delete<{ Params: requestGetLessonType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    const result = await deleteLesson(id);
    return { result };
  });
};

export default lessons;
