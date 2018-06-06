export const objectToArray = object => {
  let array = [];
  for (const key in object) {
    const value = object[key];
    array = [...array, value];
  }
  return array;
};
