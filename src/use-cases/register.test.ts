//* Libraries imports
import { describe, expect, it } from "vitest";
import { compare } from "bcryptjs";

//* Local imports
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

describe("RegisterUseCase", () => {
  it("should register a new user", async () => {
    const UserRepository = new InMemoryUsersRepository();

    const registerUseCase = new RegisterUseCase(UserRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
    });

    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("johndoe@example.com");
  });

  it("should hash user password upon registration", async () => {
    const UserRepository = new InMemoryUsersRepository();

    const registerUseCase = new RegisterUseCase(UserRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
    });

    const isPasswordCorrectHashed = await compare("password", user.password_hash);

    expect(isPasswordCorrectHashed).toBe(true);
  });

  it("should throw an error if user already exists", async () => {
    const UserRepository = new InMemoryUsersRepository();

    const registerUseCase = new RegisterUseCase(UserRepository);

    await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
    });

    await expect(async () => {
      await registerUseCase.execute({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});