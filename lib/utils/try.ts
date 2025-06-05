export const tryPromise = async <T>(p: Promise<T>) => {
  try {
    const result = await p;
    return [result, null] as const;
  } catch (error) {
    return [null, error] as const;
  }
};
