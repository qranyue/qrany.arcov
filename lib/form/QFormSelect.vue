<script setup lang="ts">
import FormItem from "@arco-design/web-vue/es/form/form-item";
import Select from "@arco-design/web-vue/es/select/select";
import type { FieldRule } from "@arco-design/web-vue/es/form/interface";

import { useFormItemInject } from "./use";

interface QFormSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  tooltip?: string;
  disabled?: boolean;
  help?: string;
  extra?: string;
  rules?: FieldRule | FieldRule[];
}

const { name } = defineProps<QFormSelectProps>();

const value = useFormItemInject(() => name);
</script>

<template>
  <FormItem :field="name" :label="label" :tooltip="tooltip" :disabled="disabled" :help="help" :extra="extra" :rules="rules">
    <Select v-model="value" :placeholder="placeholder" allow-clear></Select>
  </FormItem>
</template>
