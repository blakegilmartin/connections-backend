import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (userData: Prisma.UserCreateInput) => {
  const user = await prisma.user.create({ data: userData });
  return user;
};

const readById = async (id: number) => {
  const user = await prisma.user.findFirst({ where: { id } });
  return user;
};

const readAll = async () => {
  const allUsers = await prisma.user.findMany({});
  return allUsers;
};

const deleteById = async (id: number) => {
  const deleteRes = await prisma.user.delete({ where: { id } });
  return deleteRes;
};

const deleteAll = async () => {
  const deleteAllRes = await prisma.user.deleteMany({});
  return deleteAllRes;
};

export default { create, readById, readAll, deleteById, deleteAll };
