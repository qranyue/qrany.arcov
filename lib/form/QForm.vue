<script setup lang="ts" generic="F extends object">
import Form from "@arco-design/web-vue/es/form/form";
import { nextTick, reactive, shallowRef, useTemplateRef } from "vue";

import { useFormItemProvide, useFormState, type UseForm } from "./use";
import { tryPromise } from "../utils";

interface QFormProps {
  form?: UseForm<F>;
  request?: () => Promise<F>;
  auto?: boolean;
}

const { form, request } = defineProps<QFormProps>();

interface QFormEmits {
  (event: "submit", payload: F): void;
}

const $emit = defineEmits<QFormEmits>();

const $form = useTemplateRef("$form");

const keys = new Set<string>();

const loading = shallowRef(false);

const initial = {} as F;
const data = reactive({} as F);

const register = {
  clear: async () => {
    await nextTick();
    $form.value?.clearValidate();
  },
  fields: async (value: F) => {
    await nextTick();
    for (const [k, v] of Object.entries(value)) if (keys.has(k)) (data as F)[k as keyof F] = v as F[keyof F];
  },
  reset: async () => {
    await nextTick();
    for (const k in data)
      if (initial[k as keyof F]) (data as F)[k as keyof F] = initial[k as keyof F] as F[keyof F];
      else delete (data as F)[k as keyof F];
  },
  validate: async () => {
    await nextTick();
    return $form.value?.validate();
  },
  validates: async (name: keyof F | (keyof F)[]) => {
    await nextTick();
    return $form.value?.validateField(name as string | string[]);
  },

  data,
  form: () => form,
};

useFormState(register);

useFormItemProvide({
  register: (key) => {
    keys.add(key);
  },
  update: (key, value) => {
    if (!value) delete (data as F)[key as keyof F];
    else (data as F)[key as keyof F] = value as F[keyof F];
  },
  unregister: (key) => {
    keys.delete(key);
    delete (data as F)[key as keyof F];
  },
});

const onSubmit = () => $emit("submit", { ...data } as F);

(async () => {
  if (!request) return;
  loading.value = true;
  const [value] = await tryPromise(request());
  if (value) {
    for (const [k, v] of Object.entries(value)) if (keys.has(k)) initial[k as keyof F] = v as F[keyof F];
    register.fields(value);
  }
  loading.value = false;
})();
</script>

<template>
  <Form ref="$form" :model="data" :auto-label-width="auto" @reset="register.reset" @submit-success="onSubmit">
    <slot></slot>
  </Form>
</template>
