import { FastifyPluginAsync } from "fastify";
import { CreateRelationshipInput } from "../../types/relationships";
import { requestGetRelationshipType } from "../../types/relationships";
import { updateRelationshipInput } from "../../types/relationships";
import {
  registerRelationship,
  getAllRelationship,
  getRelationshipById,
  updateRelationship,
  deleteRelationship,
} from "../../services/relationships";

const schema = {
  body: {
    type: "object",
    required: ["teacherId", "studentId"],
    properties: {
      teacherId: { type: "string" },
      studentId: { type: "string" },
    },
  },
};

const relationship: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    const result = await getAllRelationship();
    return { result };
  });

  fastify.post<{ Body: CreateRelationshipInput }>("/", { schema }, async function (request, reply) {
    const data = request.body;
    const result = await registerRelationship(data);
    return { result };
  });

  fastify.get<{ Params: requestGetRelationshipType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    const result = await getRelationshipById(id);
    return result ?? reply.code(404);
  });

  fastify.patch<{ Params: requestGetRelationshipType; Body: updateRelationshipInput }>(
    "/:id",
    {
      schema: {
        body: {
          type: "object",
          minProperties: 1,
          properties: {
            status: { type: "string", enum: ["pending", "active", "ended"] },
          },
        },
      },
    },
    async function (request, reply) {
      const { id } = request.params;
      const updateData = request.body;
      const result = await updateRelationship(id, updateData);
      return { result };
    },
  );

  fastify.delete<{ Params: requestGetRelationshipType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    const result = await deleteRelationship(id);
    return { result };
  });
};

export default relationship;
