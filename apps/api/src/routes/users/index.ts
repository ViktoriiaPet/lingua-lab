import { FastifyPluginAsync } from "fastify";
import { CreateUserInput } from "../../types/users";
import { requestGetUserType } from "../../types/users";
import { updateUserInput } from "../../types/users";
import argon2 from "argon2";

const schema = {
  body: {
    type: "object",
    required: ["email", "name", "roles", "password"],
    properties: {
      email: { type: "string" },
      name: { type: "string" },
      roles: {
        type: "array",
        items: { type: "string", enum: ["student", "teacher"] },
        minItems: 1,
      },
      password: { type: "string" },
    },
  },
};

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    return { users: [] };
  });

  fastify.post<{ Body: CreateUserInput }>("/", { schema }, async function (request, reply) {
    const data = request.body;
    const { name, email, roles, password } = data;
    const hashPassword = await argon2.hash(password);
    return { name, email, roles, hashPassword };
  });

  fastify.get<{ Params: requestGetUserType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    return { usersId: [id] };
  });

  fastify.patch<{ Params: requestGetUserType; Body: updateUserInput }>(
    "/:id",
    {
      schema: {
        body: {
          type: "object",
          required: ["email"],
          properties: {
            email: { type: "string" },
            name: { type: "string" },
            roles: {
              type: "array",
              items: { type: "string", enum: ["student", "teacher"] },
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

  fastify.delete<{ Params: requestGetUserType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    return { usersId: [id] };
  });
};

export default users;

//user can change the password but in other endpoint
//user can change email only with other endpoint
