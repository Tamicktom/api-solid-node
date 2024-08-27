//* Libraries imports

//* Local imports
import { p } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { UserRepository } from "@/repositories/users-repository";


export class PrismaUsersRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await p.user.create({
      data,
    });

    return user;
  }

  async findUnique(data: Prisma.UserWhereUniqueInput) {
    const user = await p.user.findUnique({
      where: data,
    });

    return user;
  }
}