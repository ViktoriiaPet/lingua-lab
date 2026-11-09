export type UserRole = "student" | "teacher";

export type User = {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
};

export type CreateUserInput = {
  email: string;
  name: string;
  roles: UserRole[];
  password: string;
};
