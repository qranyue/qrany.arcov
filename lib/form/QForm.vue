<script setup lang="ts" generic="F extends FormData">
import Form from "@arco-design/web-vue/es/form/form";
import { reactive, shallowRef, useTemplateRef, type Reactive } from "vue";

import { useFormItemProvide, useFormState, type FormData, type UseForm } from "./use";
import { tryPromise } from "../utils";

interface QFormProps {
  form?: UseForm<F>;
  request?: () => Promise<F>;
  auto?: boolean;
}

const { form, request } = defineProps<QFormProps>();

interface QFormEmits {
  (event: "submit", payload: Reactive<F>): void;
}

const $emit = defineEmits<QFormEmits>();

const $form = useTemplateRef("$form");

const keys = new Set<string>();

const loading = shallowRef(false);
const data = reactive({} as F);

useFormState($form, keys, data, () => form);

useFormItemProvide({
  register: (key) => {
    keys.add(key);
  },
  update: (key, value) => {
    (data as F)[key as keyof F] = value as F[keyof F];
  },
  unregister: (key) => {
    keys.delete(key);
    delete data[key];
  },
});

const onSubmit = () => $emit("submit", data);

(async () => {
  if (!request) return;
  loading.value = true;
  const [value] = await tryPromise(request());
  if (value) Object.assign(data, value);
  loading.value = false;
})();
</script>

<template>
  <Form ref="$form" :model="data" :auto-label-width="auto" @submit-success="onSubmit">
    <slot></slot>
  </Form>
</template>
