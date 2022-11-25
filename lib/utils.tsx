export const linearMap = (
  val: number,
  fromA: number,
  fromB: number,
  toA: number,
  toB: number
) => {
  // const fromA = 0;
  // const fromB = 1;
  return ((val - fromA) * (toB - toA)) / (fromB - fromA) + toA;
};

export const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
