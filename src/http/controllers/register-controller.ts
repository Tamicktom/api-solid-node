//* Libraries imports
import type { FastifyRequest, FastifyReply } from "fastify";
import { hash } from "bcryptjs";
import z from "zod";

//* Local imports
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository';

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
    if (error instanceof Error) {
      return res.status(409).send(error.message);
    }
  }

  return res.status(201).send();
}