import { shallowReactive, watch, type WatchSource } from "vue";
import { tryPromise } from "./try";

export const usePromise = <T>(getter: WatchSource<Promise<T>>) => {
  const data = shallowReactive({
    loading: false,
    error: void 0 as unknown | undefined,
    data: void 0 as T | undefined,
  });

  watch(getter, async (promise) => {
    data.loading = true;
    data.error = void 0;
    data.data = void 0;

    [data.data, data.error] = await tryPromise(promise);
  });

  return data;
};
