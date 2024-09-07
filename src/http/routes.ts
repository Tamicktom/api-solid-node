//* Libraries imports
import type { FastifyInstance } from "fastify";

//* Local imports
import { register } from "@/http/controllers/register";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
}