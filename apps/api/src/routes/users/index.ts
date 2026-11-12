import { FastifyPluginAsync } from "fastify";
import { CreateUserInput } from "../../types/users";
import { requestGetUserType } from "../../types/users";
import { updateUserInput } from "../../types/users";
import { registerUser } from "../../services/users";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../../services/users";

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
    const users = await getAllUsers();
    return { users };
  });

  fastify.post<{ Body: CreateUserInput }>("/", { schema }, async function (request, reply) {
    const data = request.body;
    //const { name, email, roles, password } = data;
    const result = await registerUser(data);
    return { result };
  });

  fastify.get<{ Params: requestGetUserType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    const result = await getUserById(id);
    return result;
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
      const result = await updateUser(id, updateData);
      return { result };
    },
  );

  fastify.delete<{ Params: requestGetUserType }>("/:id", async function (request, reply) {
    const { id } = request.params;
    const result = await deleteUser(id);
    return { result };
  });
};

export default users;

//user can change the password but in other endpoint
//user can change email only with other endpoint
