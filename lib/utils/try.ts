export const tryPromise = async <T>(p: Promise<T>) => {
  try {
    return [await p] as const;
  } catch (error) {
    return [void 0, error] as const;
  }
};
