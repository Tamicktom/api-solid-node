//* Libraries imports
import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";

//* Local imports
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const body = registerBodySchema.parse(req.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);
    await registerUseCase.execute(body);
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res
        .status(409)
        .send({
          message: error.message,
        });
    }

    // return res.status(500); // TODO: Improve this
    throw error;
  }

  return res.status(201).send();
}