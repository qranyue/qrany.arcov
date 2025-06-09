<script setup lang="ts">
import FormItem from "@arco-design/web-vue/es/form/form-item";
import RangePicker from "@arco-design/web-vue/es/date-picker/range-picker";
import type { FieldRule } from "@arco-design/web-vue/es/form/interface";

import { useFormItemInject } from "./use";

interface QFormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  tooltip?: string;
  disabled?: boolean;
  help?: string;
  extra?: string;
  rules?: FieldRule | FieldRule[];
}

const { name } = defineProps<QFormInputProps>();

const value = useFormItemInject(() => name);
</script>

<template>
  <FormItem :field="name" :label="label" :tooltip="tooltip" :disabled="disabled" :help="help" :extra="extra" :rules="rules">
    <RangePicker mode="year" v-model="value" :placeholder="placeholder" allow-clear style="flex: auto"></RangePicker>
  </FormItem>
</template>
