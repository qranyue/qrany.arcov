<script setup lang="ts">
import FormItem from "@arco-design/web-vue/es/form/form-item";
import TextArea from "@arco-design/web-vue/es/textarea/textarea";
import type { FieldRule } from "@arco-design/web-vue/es/form/interface";

import { useFormItemInject } from "./use";

interface QFormTextAreaProps {
  name: string;
  label: string;
  placeholder?: string;
  tooltip?: string;
  disabled?: boolean;
  help?: string;
  extra?: string;
  rules?: FieldRule | FieldRule[];
}

const { name } = defineProps<QFormTextAreaProps>();

const value = useFormItemInject<string>(() => name);
</script>

<template>
  <FormItem :field="name" :label="label" :tooltip="tooltip" :disabled="disabled" :help="help" :extra="extra" :rules="rules">
    <TextArea v-model="value" :placeholder="placeholder" allow-clear></TextArea>
  </FormItem>
</template>
