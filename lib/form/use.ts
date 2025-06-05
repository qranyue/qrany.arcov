import { type FormInstance } from "@arco-design/web-vue";
import { customRef, inject, nextTick, provide, watchEffect, type InjectionKey, type Reactive, type ShallowRef } from "vue";

const FORM = Symbol();

type FormRef = Readonly<ShallowRef<FormInstance>>;

export type FormData = Record<string, unknown>;

type FormState<T> = (ref: FormRef, keys: Set<string>, data: Reactive<T>) => void;

export interface UseForm<T extends FormData> {
  clear: () => Promise<void>;
  fields: (data: T) => Promise<void>;
  reset: () => Promise<void>;
  validate: () => Promise<void>;
  validates: (name?: keyof T | (keyof T)[]) => Promise<void>;

  [FORM]: FormState<T>;
}

export const useForm = <T extends FormData>() => {
  let ks: Set<string>;
  let $ref: FormRef;
  let value: Reactive<T>;
  const form = {
    clear: async () => {
      await nextTick();
      await $ref.value.clearValidate();
    },
    fields: async (data) => {
      await nextTick();
      for (const [k, v] of Object.entries(data)) {
        if (ks.has(k)) (value as T)[k as keyof T] = v as T[keyof T];
      }
    },
    reset: async () => {
      await nextTick();
      for (const k in value) delete value[k];
    },
    validate: async () => {
      await nextTick();
      await $ref.value.validate();
    },
    validates: async (name) => {
      await nextTick();
      await $ref.value.validateField(name);
    },
    [FORM]: (ref, keys, data) => {
      $ref = ref;
      value = data;
      ks = keys;
    },
  } as UseForm<T>;
  return form;
};

const FORM_DATA = Symbol() as InjectionKey<Reactive<FormData>>;

export const useFormState = <T extends FormData>($ref: FormRef, keys: Set<string>, data: Reactive<T>, form: () => UseForm<T> | undefined) => {
  provide(FORM_DATA, data);
  watchEffect(() => form()?.[FORM]($ref, keys, data));
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

export const useFormItemInject = <T>(get: () => string) => {
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
      return data[get()] as T;
    },
    set: (v: T) => {
      i?.update(get() as keyof FormData, v);
      trigger();
    },
  }));
};
