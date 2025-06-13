import type { ValidatedError } from "@arco-design/web-vue/es/form/interface";
import { computed, inject, provide, watchEffect, type InjectionKey, type Reactive } from "vue";

const FORM_SYMBOL = Symbol();

const FORM_MODEL = Symbol() as InjectionKey<Reactive<object>>;

interface UseFormStateParam<T extends object> {
  clear: () => Promise<void>;
  fields: (data: Partial<T>) => Promise<void>;
  reset: () => Promise<void>;
  validate: () => Promise<Record<string, ValidatedError> | undefined>;
  validates: (...names: (keyof T)[]) => Promise<Record<string, ValidatedError> | undefined>;

  model: Reactive<T>;
  form: () => UseForm<T> | undefined;
}

export const useFormState = <T extends object>(state: UseFormStateParam<T>) => {
  const { model: data, form, ...rest } = state;
  provide(FORM_MODEL, data);
  watchEffect(() => form()?.[FORM_SYMBOL]?.(rest));
};

export const useFormModelInject = () => inject(FORM_MODEL);

export interface UseForm<T extends object> extends Omit<UseFormStateParam<T>, "model" | "form"> {
  [FORM_SYMBOL]?: (state: Omit<UseFormStateParam<T>, "model" | "form">) => void;
}

export const useForm = <T extends object>() => {
  type UF = Omit<UseForm<T>, typeof FORM_SYMBOL>;
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
    [FORM_SYMBOL]: (state) => {
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
      delete form[FORM_SYMBOL];
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

  const data = inject(FORM_MODEL, {});
  return computed({
    get: () => (data as object)[get() as keyof object] as V,
    set: (v) => i?.update(get(), v),
  });
};
