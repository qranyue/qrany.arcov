<script setup lang="ts">
import FormItem from "@arco-design/web-vue/es/form/form-item";
import InputNumber from "@arco-design/web-vue/es/input-number/input-number";
import { useFormItemInject } from "./use";
import type { FieldRule } from "@arco-design/web-vue/es/form/interface";

interface QFormDigitProps {
  name: string;
  label: string;
  tooltip?: string;
  disabled?: boolean;
  help?: string;
  extra?: string;
  rules?: FieldRule | FieldRule[];

  precision?: number;
}

const { name } = defineProps<QFormDigitProps>();

const value = useFormItemInject<number>(() => name);
</script>

<template>
  <FormItem :field="name" :label="label" :tooltip="tooltip" :disabled="disabled" :help="help" :extra="extra" :rules="rules">
    <InputNumber v-model="value" :precision="precision ?? 2" allow-clear></InputNumber>
  </FormItem>
</template>
