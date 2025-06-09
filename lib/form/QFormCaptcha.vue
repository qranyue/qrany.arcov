<script setup lang="ts">
import FormItem from "@arco-design/web-vue/es/form/form-item";
import Input from "@arco-design/web-vue/es/input/input";
import Row from "@arco-design/web-vue/es/grid/grid-row";
import Col from "@arco-design/web-vue/es/grid/grid-col";
import type { FieldRule } from "@arco-design/web-vue/es/form/interface";
import { shallowRef } from "vue";

import { useFormItemInject } from "./use";
import { tryPromise } from "../utils";

interface QFormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  tooltip?: string;
  disabled?: boolean;
  help?: string;
  extra?: string;
  rules?: FieldRule | FieldRule[];

  getCaptcha?: (phone: string) => Promise<string>;
  count?: number;
  text?: (time: number) => string;
}

const { name, getCaptcha, count, text } = defineProps<QFormInputProps>();

const value = useFormItemInject<string>(() => name);

const time = shallowRef(0);

let data: number | void;
let timer: number | undefined;

const end = () => {
  data = void 0;
  clearInterval(timer);
  timer = void 0;
  time.value = 0;
};

const interval = () => {
  if (!data) return;
  if (time.value <= 0) end();
  else time.value = Math.max(0, Math.floor((data - Date.now()) / 1000));
};

const start = () => {
  data = Date.now() + (count ?? 60) * 1000;
  interval();
  timer = setInterval(interval, 1000);
};

const onGetCaptcha = async () => {
  const v = getCaptcha?.(value.value);
  if (!v) return;
  await tryPromise(v);
  start();
};

const textRender = () => {
  const v = time.value;
  return (text?.(v) ?? v > 0) ? `${`${v}`.padStart(2, "0")}秒后重新获取` : "获取验证码";
};

defineExpose({ start, end });
</script>

<template>
  <FormItem :field="name" :label="label" :tooltip="tooltip" :disabled="disabled" :help="help" :extra="extra" :rules="rules">
    <Row :gutter="8">
      <Col flex="auto">
        <Input v-model="value" :placeholder="placeholder" allow-clear></Input>
      </Col>
      <Col flex="none">
        <Button :disabled="time > 0" @click="onGetCaptcha">{{ textRender() }}</Button>
      </Col>
    </Row>
  </FormItem>
</template>
