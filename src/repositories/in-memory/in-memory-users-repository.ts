//* Libraries imports

//* Local imports
import type { Prisma, User } from "@prisma/client";
import type { UserRepository } from "@/repositories/users-repository";


export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: "user-1",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async findUnique(data: Prisma.UserWhereUniqueInput) {
    const user = this.items.find((item) => item.id === data.id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}