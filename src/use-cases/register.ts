//* Libraries imports
import { hash } from "bcryptjs";

//* Local imports
import { p } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase(data: RegisterUseCaseRequest) {
  const { name, email, password } = data;

  const password_hash = await hash(password, 10);

  const userWithSameEmail = await p.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("Email already in use");
  }

  const prismaUsersRepository = new PrismaUsersRepository();

  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  });
}