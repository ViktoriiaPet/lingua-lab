export type UserRole = "student" | "teacher";

export type User = {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  password: string;
};

export type CreateUserInput = {
  email: string;
  name: string;
  roles: UserRole[];
  password: string;
};

export type requestGetUserType = {
  id: string;
};
export type updateUserInput = {
  email: string;
  name?: string;
  roles?: UserRole[];
};
export type UpdateUserInput = Partial<Pick<User, "name" | "email" | "roles">>;
