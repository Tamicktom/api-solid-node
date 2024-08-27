//* Libraries imports
import { PrismaClient } from "@prisma/client";
import { env } from "@/env";

export const p = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query", "error", "warn"] : ["error"],
});