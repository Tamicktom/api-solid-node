//* Libraries imports

//* Local imports
import { p } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";



export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await p.user.create({
      data,
    });

    return user;
  }
}