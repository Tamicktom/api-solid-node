//* Libraries imports
import type { FastifyRequest, FastifyReply } from "fastify";
import { hash } from "bcryptjs";
import z from "zod";

//* Local imports
import { p } from "@/lib/prisma";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  const hashedPassword = await hash(password, 10);

  const userWithSameEmail = await p.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    return res.status(409).send("Email already in use");
  }

  await p.user.create({
    data: {
      name,
      email,
      password_hash: hashedPassword,
    },
  });

  return res.status(201).send();
}