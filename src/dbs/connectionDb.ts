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

  const connectionArray =
    connectionData?.categoryAnswers1
      .split(",")
      .concat(connectionData?.categoryAnswers2.split(","))
      .concat(connectionData.categoryAnswers3.split(","))
      .concat(connectionData.categoryAnswers4.split(",")) || [];

  shuffle(connectionArray);

  const connection = await prisma.connection.create({
    data: { ...connectionData, defaultLayout: connectionArray.join() },
  });
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

function shuffle(array: string[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex: number = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

const getLatest = async () => {
  const connection = await prisma.connection.findFirst({});

  return connection?.defaultLayout.split(",");
};

const deleteAll = async () => {
  const deleteRes = await prisma.connection.deleteMany({});

  return deleteRes;
};

export default { create, readById, getLatest, deleteAll };
