<script setup lang="ts">
import FormItem from "@arco-design/web-vue/es/form/form-item";
import Input from "@arco-design/web-vue/es/input/input";
import { useFormItemInject } from "./use";
import type { FieldRule } from "@arco-design/web-vue/es/form/interface";

interface QFormInputProps {
  name: string;
  label: string;
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
    <Input v-model="value"></Input>
  </FormItem>
</template>
