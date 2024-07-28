export const isNull = (v) => v === null || v === undefined;

export const pick = (obj, ...keys) => {
  const now = {};
  for (const k of keys) if (!isNull(obj[k])) now[k] = obj[k];
  return now;
};

export const omit = (obj, ...keys) => {
  const now = { ...obj };
  for (const k of keys) delete now[k];
  return now;
};
