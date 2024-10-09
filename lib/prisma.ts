import { PrismaClient } from "@prisma/client";
  
declare global {
  let prisma: PrismaClient | undefined;
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
export const prisma = globalThis.prisma || new PrismaClient();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;