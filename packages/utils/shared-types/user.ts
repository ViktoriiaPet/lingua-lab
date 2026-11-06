type UserRole = "Student" | "Teacher";

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole[];
};
