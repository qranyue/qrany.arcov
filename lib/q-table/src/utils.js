import { Comment, Fragment } from "vue";

export const is_null = (v) => v === null || v === undefined;

export const pick = (obj, ...keys) => {
  const now = {};
  for (const k of keys) if (!is_null(obj[k])) now[k] = obj[k];
  return now;
};

export const omit = (obj, ...keys) => {
  const now = { ...obj };
  for (const k of keys) delete now[k];
  return now;
};

export const digit = (value) => {
  return Number(value)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const filter_vnodes = (vnodes = []) => {
  if (!Array.isArray(vnodes)) vnodes = [vnodes];
  return vnodes.filter((x) => x.type !== Comment && x.type !== Fragment);
};

export const parse_dicts = (v = []) => {
  const index = { i: {}, h: {} };
  const res = { options: [], filter: [], enum: {} };
  for (const [i, x] of v.entries()) {
    if (!index[":"] && !is_null(x[2])) index[":"] = true;
    index.i[x[0]] = i;
    index.h[x[0]] = is_null(x[2]);
    res.enum[x[0]] = x[1];
    res.options.push({ value: x[0], label: x[1] });
    res.filter.push({ value: x[0], text: x[1] });
  }
  if (index[":"]) {
    for (const [i, x] of v.entries()) {
      const p = index.i[x[2]];
      if (is_null(x[2]) || is_null(p)) continue;
      res.options[p].children ??= [];
      res.options[p].children.push(res.options[i]);
    }
    res.options = res.options.filter((x) => index.h[x.value]);
  }
  return res;
};

export const parse_image = (image) => {
  if (!Array.isArray(image) && typeof image === "object") return image;
  if (typeof image === "string") image = image.split("|");
  return {
    name: image[0],
    url: image[1] || image[0],
    type: image[3] || 'image/*'
  };
};

export const parse_images = (images) => {
  if (!images) return [];
  if (!Array.isArray(images)) images = images.split(",");
  return images.map(parse_image);
};
