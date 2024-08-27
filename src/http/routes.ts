//* Libraries imports
import type { FastifyInstance } from "fastify";

//* Local imports
import { register } from "@/http/controllers/register-controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
}