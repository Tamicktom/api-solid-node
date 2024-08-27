//* Libraries imports
import type { FastifyRequest, FastifyReply } from "fastify";
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

  const user = await p.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  });

  return res.status(201).send();
}