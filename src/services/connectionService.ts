import connectionDb from "../dbs/connectionDb";

// 1. accepts an answer string eg: "red,blue,green,yellow"
// 2. converts it to an array of strings
// 3. orders the array of strings
// 4. joins it back to input format
export const convertOrderStringifyAnswer = (answer: string) => {
  const splitAnswer: string[] = answer.toLowerCase().split(",");
  const sortedAttemptArray = splitAnswer.sort();
  const stringSortedAttemptArray = sortedAttemptArray.join();
  return stringSortedAttemptArray;
};

const checkAttempt = async (id: number, attempt: string) => {
  const connection = await connectionDb.readById(id);
  const sortedAttemptString = convertOrderStringifyAnswer(attempt);
  if (connection?.categoryAnswers1 === sortedAttemptString)
    return connection.categoryName1;
  if (connection?.categoryAnswers2 === sortedAttemptString)
    return connection.categoryName2;
  if (connection?.categoryAnswers3 === sortedAttemptString)
    return connection.categoryName3;
  if (connection?.categoryAnswers4 === sortedAttemptString)
    return connection.categoryName4;

  return null;
};

export default { checkAttempt };
