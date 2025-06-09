import type { ValidatedError } from "@arco-design/web-vue/es/form/interface";
import { customRef, inject, provide, watchEffect, type InjectionKey, type Reactive } from "vue";

const FORM = Symbol();

const FORM_DATA = Symbol() as InjectionKey<Reactive<object>>;

interface UseFormStateParam<T extends object> {
  clear: () => Promise<void>;
  fields: (data: T) => Promise<void>;
  reset: () => Promise<void>;
  validate: () => Promise<Record<string, ValidatedError> | undefined>;
  validates: (name: keyof T | (keyof T)[]) => Promise<Record<string, ValidatedError> | undefined>;

  data: Reactive<T>;
  form: () => UseForm<T> | undefined;
}

export const useFormState = <T extends object>(state: UseFormStateParam<T>) => {
  const { data, form, ...rest } = state;
  provide(FORM_DATA, data);
  watchEffect(() => form()?.[FORM]?.(rest));
};

export interface UseForm<T extends object> extends Omit<UseFormStateParam<T>, "data" | "form"> {
  [FORM]?: (state: Omit<UseFormStateParam<T>, "data" | "form">) => void;
}

export const useForm = <T extends object>() => {
  type UF = Omit<UseForm<T>, typeof FORM>;
  let es: [string, never[], (value: never) => void][] | void;
  const ev = (type: string, data: never[]) => {
    return new Promise<never>((resolve) => {
      es ??= [];
      es?.push([type, data, resolve]);
    });
  };
  const form = {
    clear: () => ev("clear", []),
    fields: (data) => ev("fields", [data as never]),
    reset: () => ev("reset", []),
    validate: () => ev("validate", []),
    validates: (name) => ev("validates", [name as never]),
    [FORM]: (state) => {
      form.clear = state.clear;
      form.fields = state.fields;
      form.reset = state.reset;
      form.validate = state.validate;
      form.validates = state.validates;
      for (const [type, data, resolve] of es ?? []) {
        const fn = state[type as keyof UF] as (...data: never[]) => Promise<never>;
        (async () => resolve(await fn(...data)))();
      }
      es = void 0;
      delete form[FORM];
    },
  } as UseForm<T>;
  return form;
};

interface FormItemProvide {
  /** 注册 */
  register: (name: string) => void;
  /** 更新 */
  update: (name: string, value: unknown) => void;
  /** 卸载 */
  unregister: (name: string) => void;
}

const FORM_ITEM = Symbol() as InjectionKey<FormItemProvide>;

export const useFormItemProvide = (item: FormItemProvide) => {
  provide(FORM_ITEM, item);
};

export const useFormItemInject = <V>(get: () => string) => {
  const i = inject(FORM_ITEM);

  watchEffect((onCleanup) => {
    const name = get();
    i?.register(name);
    onCleanup(() => {
      i?.unregister(name);
    });
  });

  const data = inject(FORM_DATA, {});
  return customRef((track, trigger) => ({
    get: () => {
      track();
      return (data as object)[get() as keyof object] as V;
    },
    set: (v: V) => {
      i?.update(get(), v);
      trigger();
    },
  }));
};
