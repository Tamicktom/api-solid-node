//* Libraries imports
import { hash } from "bcryptjs";

//* Local imports
import { p } from "@/lib/prisma";
import type { UserRepository } from "@/repositories/users-repository";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UserRepository) { }

  async execute(data: RegisterUseCaseRequest) {
    const { name, email, password } = data;

    const password_hash = await hash(password, 10);

    const userWithSameEmail = await this.usersRepository.findUnique({
      email,
    });

    if (userWithSameEmail) {
      throw new Error("Email already in use");
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}

