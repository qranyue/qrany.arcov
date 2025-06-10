<script setup lang="ts">
import FormItem from "@arco-design/web-vue/es/form/form-item";
import Picker from "@arco-design/web-vue/es/date-picker/picker";
import type { FieldRule } from "@arco-design/web-vue/es/form/interface";

import { useFormItemInject } from "./use";

interface QFormDatePickerProps {
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

const { name } = defineProps<QFormDatePickerProps>();

const value = useFormItemInject(() => name);
</script>

<template>
  <FormItem :field="name" :label="label" :tooltip="tooltip" :disabled="disabled" :help="help" :extra="extra" :rules="rules">
    <Picker v-model="value" :mode="mode" :format="format" :show-time="showTime" :placeholder="placeholder" allow-clear style="flex: auto"></Picker>
  </FormItem>
</template>
