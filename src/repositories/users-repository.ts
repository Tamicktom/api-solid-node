//* Libraries imports
import type { Prisma, User } from "@prisma/client";


export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User | null>;
  findUnique(data: Prisma.UserWhereUniqueInput): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}