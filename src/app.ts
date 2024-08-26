//* Libraries imports
import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

export const app = fastify();