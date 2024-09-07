//* Libraries imports
import fastify from "fastify";
import { ZodError } from "zod";

//* Local imports
import { appRoutes } from "@/http/routes";
import { env } from "./env";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.format()
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
    // TODO: here we should log to a external tool like sentry, datadog, new relic, etc.
  }

  return reply.status(500).send({
    message: "Internal server error",
  });
});