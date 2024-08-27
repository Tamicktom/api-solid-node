//* Libraries imports
import fastify from "fastify";

//* Local imports
import { appRoutes } from "@/http/routes";

export const app = fastify();

app.register(appRoutes);