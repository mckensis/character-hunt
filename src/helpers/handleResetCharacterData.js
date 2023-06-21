export const handleResetCharacterData = (characters) => {
  characters.forEach(character => {
    character.found = false;
  });

  return characters;
}