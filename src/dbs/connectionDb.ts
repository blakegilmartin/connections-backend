import { PrismaClient, Prisma } from "@prisma/client";
import { convertOrderStringifyAnswer } from "../services/connectionService";

const prisma = new PrismaClient();

const create = async (connectionData: Prisma.ConnectionCreateInput) => {
  connectionData.categoryAnswers1 = convertOrderStringifyAnswer(
    connectionData.categoryAnswers1
  );
  connectionData.categoryAnswers2 = convertOrderStringifyAnswer(
    connectionData.categoryAnswers2
  );
  connectionData.categoryAnswers3 = convertOrderStringifyAnswer(
    connectionData.categoryAnswers3
  );
  connectionData.categoryAnswers4 = convertOrderStringifyAnswer(
    connectionData.categoryAnswers4
  );
  const connection = await prisma.connection.create({ data: connectionData });
  return connection;
};

const readById = async (id: number) => {
  const connection = await prisma.connection.findFirst({
    where: {
      id,
    },
  });

  return connection;
};

export default { create, readById };
