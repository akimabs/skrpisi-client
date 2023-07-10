export const capitalize = (word: string) => {
  return word?.replace(/\b\w/g, function (l) {
    return `${l.toUpperCase()}`;
  });
};
