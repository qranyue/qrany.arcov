<script setup lang="ts" generic="F extends QFormData">
import Form from "@arco-design/web-vue/es/form/form";
import Space from "@arco-design/web-vue/es/space/space";
import { nextTick, reactive, shallowRef, useTemplateRef } from "vue";

import { useFormItemProvide, useFormState, type QFormData, type UseForm } from "./use";
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
      if (initial[k]) (data as F)[k as keyof F] = initial[k] as F[keyof F];
      else delete data[k];
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
    (data as F)[key as keyof F] = value as F[keyof F];
  },
  unregister: (key) => {
    keys.delete(key);
    delete data[key];
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

    <div v-if="$slots.footer" class="qrany-form-footer">
      <Space wrap>
        <slot name="footer"></slot>
      </Space>
    </div>
  </Form>
</template>

<style lang="css" scoped>
.qrany-form-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: -8px;
  padding: 10px 16px;
  background-color: #fff;
  text-align: end;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
}
</style>
