<script setup lang="ts">
import FormItem from "@arco-design/web-vue/es/form/form-item";
import Picker from "@arco-design/web-vue/es/date-picker/picker";
import type { FieldRule } from "@arco-design/web-vue/es/form/interface";

import { useFormItemInject } from "./use";

interface QFormDateTimePickerProps {
  name: string;
  label: string;
  placeholder?: string;
  tooltip?: string;
  disabled?: boolean;
  help?: string;
  extra?: string;
  rules?: FieldRule | FieldRule[];
}

const { name } = defineProps<QFormDateTimePickerProps>();

const value = useFormItemInject(() => name);
</script>

<template>
  <FormItem :field="name" :label="label" :tooltip="tooltip" :disabled="disabled" :help="help" :extra="extra" :rules="rules">
    <Picker v-model="value" :placeholder="placeholder" show-time allow-clear style="flex: auto"></Picker>
  </FormItem>
</template>
