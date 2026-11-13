import { FastifyPluginAsync } from "fastify";
import { CreateAssignmentInput } from "../../types/assignment";
import { requestGetAssignmentType } from "../../types/assignment";
import { updateAssignmentInput } from "../../types/assignment";
import {
  registerAssignment,
  getAllAssignment,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from "../../services/assignment";

const schema = {
  body: {
    type: "object",
    required: ["teacherId", "studentId", "exerciseId"],
    properties: {
      teacherId: { type: "string" },
      studentId: { type: "string" },
      exerciseId: { type: "string" },
    },
  },
};

const assignment: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    const result = await getAllAssignment();
    return { result };
  });

  fastify.post<{ Body: CreateAssignmentInput }>("/", { schema }, async function (request, reply) {
    const data = request.body;
    const result = await registerAssignment(data);
    return { result };
  });

  fastify.get<{ Params: requestGetAssignmentType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    const result = await getAssignmentById(id);
    return result ?? reply.code(404);
  });

  fastify.patch<{ Params: requestGetAssignmentType; Body: updateAssignmentInput }>(
    "/:id",
    {
      schema: {
        body: {
          type: "object",
          minProperties: 1,
          properties: {
            status: { type: "string", enum: ["assigned", "completed", "cancelled", "hidden"] },
          },
        },
      },
    },
    async function (request, reply) {
      const { id } = request.params;
      const updateData = request.body;
      const result = await updateAssignment(id, updateData);
      return { result };
    },
  );

  fastify.delete<{ Params: requestGetAssignmentType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    const result = await deleteAssignment(id);
    return { result };
  });
};

export default assignment;
