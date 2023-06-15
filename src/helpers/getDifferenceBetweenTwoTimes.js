import { differenceInMilliseconds } from "date-fns";

export const getDifferenceBetweenTwoTimes = (response) => {
  const { start } = response.data();
  const { finish } = response.data();

  const serverStart = new Date(start.seconds * 1000);
  const serverFinish = new Date(finish.seconds * 1000);
  const difference = differenceInMilliseconds(serverStart, serverFinish);
  
  // Check if the number is negative
  if (Math.sign(difference) === -1) {
    // Converts to positive number and returns
    return -difference;
  } else {
    // Returns positive number (or zero)
    return difference;
  }
}