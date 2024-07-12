// import { PrismaClient } from "@prisma/client"; // this works in development
// import { PrismaClient } from '../../prisma/generated/client';
import {PrismaClient} from "../prisma/generated/client"; // this works in production

declare global {
  var prisma: PrismaClient | undefined;
}

export const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production")
  
  globalThis.prisma = prismadb;