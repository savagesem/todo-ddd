export const wait = (millis: number) => {
  return new Promise(resolve => setTimeout(resolve, millis));
};
