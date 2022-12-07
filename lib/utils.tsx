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


// // Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
// export const keyStr =
//   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

// export const triplet = (e1: number, e2: number, e3: number) =>
//   keyStr.charAt(e1 >> 2) +
//   keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
//   keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
//   keyStr.charAt(e3 & 63)

// export const rgbDataURL = (r: number, g: number, b: number) =>
//   `data:image/gif;base64,R0lGODlhAQABAPAA${
//     triplet(0, r, g) + triplet(b, 255, 255)
//   }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
