<script setup lang="ts">
import FormItem from "@arco-design/web-vue/es/form/form-item";
import RangePicker from "@arco-design/web-vue/es/date-picker/range-picker";
import type { FieldRule } from "@arco-design/web-vue/es/form/interface";

import { useFormItemInject } from "./use";

interface QFormDateRangePickerProps {
  name: string;
  label: string;
  placeholder?: string;
  tooltip?: string;
  disabled?: boolean;
  help?: string;
  extra?: string;
  rules?: FieldRule | FieldRule[];

  mode?: "week" | "month" | "quarter" | "year";
  format?: string;
  showTime?: boolean;
}

const { name } = defineProps<QFormDateRangePickerProps>();

const value = useFormItemInject(() => name);
</script>

<template>
  <FormItem :field="name" :label="label" :tooltip="tooltip" :disabled="disabled" :help="help" :extra="extra" :rules="rules">
    <RangePicker v-model="value" :mode="mode" :format="format" :show-time="showTime" :placeholder="placeholder" allow-clear style="flex: auto"></RangePicker>
  </FormItem>
</template>
