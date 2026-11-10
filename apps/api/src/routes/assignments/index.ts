import { FastifyPluginAsync } from "fastify";
import { CreateAssignmentInput } from "../../types/assignment";
import { requestGetAssignmentType } from "../../types/assignment";
import { updateAssignmentInput } from "../../types/assignment";

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
    return { assignments: [] };
  });

  fastify.post<{ Body: CreateAssignmentInput }>("/", { schema }, async function (request, reply) {
    const data = request.body;
    const { teacherId, studentId, exerciseId } = data;
    return { teacherId, studentId, exerciseId };
  });

  fastify.get<{ Params: requestGetAssignmentType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    return { assignmentId: [id] };
  });

  fastify.patch<{ Params: requestGetAssignmentType; Body: updateAssignmentInput }>(
    "/:id",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            status: { type: "string", enum: ["assigned", "completed", "cancelled", "hidden"] },
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

  fastify.delete<{ Params: requestGetAssignmentType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    return { assignmentId: [id] };
  });
};

export default assignment;
