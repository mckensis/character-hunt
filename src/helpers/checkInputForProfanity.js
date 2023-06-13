import Filter from "bad-words";

export const checkInputForProfanity = (input) => {
  const filter = new Filter();
  const replaced = input.replaceAll(" ", "");

  if (filter.isProfane(input) || filter.isProfane(replaced)) {
    return true;
  }

  return false;
}