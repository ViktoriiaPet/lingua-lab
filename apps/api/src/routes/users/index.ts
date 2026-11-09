import { FastifyPluginAsync } from "fastify";
import { CreateUserInput } from "../../types/users";
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
};

export default users;
