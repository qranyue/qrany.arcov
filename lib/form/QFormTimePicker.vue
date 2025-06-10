<script setup lang="ts">
import FormItem from "@arco-design/web-vue/es/form/form-item";
import TimePicker from "@arco-design/web-vue/es/time-picker/time-picker";
import type { FieldRule } from "@arco-design/web-vue/es/form/interface";

import { useFormItemInject } from "./use";

interface QFormTimePickerProps {
  name: string;
  label: string;
  placeholder?: string;
  tooltip?: string;
  disabled?: boolean;
  help?: string;
  extra?: string;
  rules?: FieldRule | FieldRule[];

  format?: string;
}

const { name } = defineProps<QFormTimePickerProps>();

const value = useFormItemInject(() => name);
</script>

<template>
  <FormItem :field="name" :label="label" :tooltip="tooltip" :disabled="disabled" :help="help" :extra="extra" :rules="rules">
    <TimePicker v-model="value" :format="format" :placeholder="placeholder" allow-clear style="flex: auto"></TimePicker>
  </FormItem>
</template>
