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

export const digst = (value) => {
  return Number(value)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const getImage = (image) => {
  if (typeof image === "object") return image;
  image = image.split("|");
  return {
    name: image[0],
    url: image[1] || image[0],
  };
};

export const getImages = (images) => {
  if (!images) return [];
  if (!Array.isArray(images)) images = images.split(",");
  return images.map(getImage);
};
