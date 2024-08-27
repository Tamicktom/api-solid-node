//* Libraries imports
import { hash } from "bcryptjs";

//* Local imports
import { p } from "@/lib/prisma";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase(data: RegisterUseCaseRequest) {
  const { name, email, password } = data;

  const hashedPassword = await hash(password, 10);

  const userWithSameEmail = await p.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("Email already in use");
  }

  await p.user.create({
    data: {
      name,
      email,
      password_hash: hashedPassword,
    },
  });
}