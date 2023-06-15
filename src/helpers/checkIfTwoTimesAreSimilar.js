// Checks if two numbers provided are within a range of each other
export const checkIfTwoTimesAreSimilar = (serverTime, userTime) => {
  // The times can have one second (1000ms) difference and be accepted
  const allowedDifference = 1000;
  
  // Return true if the numbers are within one second of each other
  if ((serverTime - userTime > (0 - allowedDifference))
    || (userTime - serverTime < allowedDifference)) {
      return true;
  }

  return false;
}