//* Libraries imports
import { hash } from "bcryptjs";

//* Local imports
import type { UserRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import type { User } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
};

export class RegisterUseCase {
  constructor(private usersRepository: UserRepository) { }

  async execute(data: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const { name, email, password } = data;

    const password_hash = await hash(password, 10);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    if (user === null) {
      throw new Error("User not created");
    };

    return {
      user,
    };
  }
}

