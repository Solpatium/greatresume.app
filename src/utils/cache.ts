const cache = {};

let counter = 0;
export const add = (payload: unknown): string => {
  const key = "" + counter;
  counter += 1;
  cache[key] = payload;
  return key;
};

export const pop = (key: string): unknown => {
  const payload = cache[key];
  delete cache[key];
  return payload;
};
