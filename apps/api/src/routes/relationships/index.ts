import { FastifyPluginAsync } from "fastify";
import { CreateRelationshipInput } from "../../types/relationships";
import { requestGetRelationshipType } from "../../types/relationships";
import { updateRelationshipInput } from "../../types/relationships";

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
    return { relationships: [] };
  });

  fastify.post<{ Body: CreateRelationshipInput }>("/", { schema }, async function (request, reply) {
    const data = request.body;
    const { teacherId, studentId } = data;
    return { teacherId, studentId };
  });

  fastify.get<{ Params: requestGetRelationshipType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    return { relationshipId: [id] };
  });

  fastify.patch<{ Params: requestGetRelationshipType; Body: updateRelationshipInput }>(
    "/:id",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            status: { type: "string", enum: ["pending", "active", "ended"] },
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

  fastify.delete<{ Params: requestGetRelationshipType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    return { relationshipId: [id] };
  });
};

export default relationship;
