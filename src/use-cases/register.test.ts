//* Libraries imports
import { describe, expect, it, test } from "vitest";
import { compare, hash } from "bcryptjs";

//* Local imports
import { RegisterUseCase } from "./register";

describe("RegisterUseCase", () => {
  it("should hash user password upon registration", async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null;
      },
      async findUnique(data) {
        return null;
      },
      async create(data) {
        return ({
          id: "user-1",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        })
      }
    });

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
    });

    const isPasswordCorrectHashed = await compare("password", user.password_hash);

    expect(isPasswordCorrectHashed).toBe(true);
  });
});