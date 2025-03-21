import { PrismaClient } from "@prisma/client";

const prismaGlobal = globalThis as unknown as { prisma?: PrismaClient };

const prismadb = prismaGlobal.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  prismaGlobal.prisma = prismadb;
}

export default prismadb;
