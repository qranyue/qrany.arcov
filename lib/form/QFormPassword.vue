<script setup lang="ts">
import FormItem from "@arco-design/web-vue/es/form/form-item";
import InputPassword from "@arco-design/web-vue/es/input/input-password";
import type { FieldRule } from "@arco-design/web-vue/es/form/interface";

import { useFormItemInject } from "./use";

interface QFormPasswordProps {
  name: string;
  label: string;
  placeholder?: string;
  tooltip?: string;
  disabled?: boolean;
  help?: string;
  extra?: string;
  rules?: FieldRule | FieldRule[];
}

const { name } = defineProps<QFormPasswordProps>();

const value = useFormItemInject(() => name);
</script>

<template>
  <FormItem :field="name" :label="label" :tooltip="tooltip" :disabled="disabled" :help="help" :extra="extra" :rules="rules">
    <InputPassword v-model="value" :placeholder="placeholder" allow-clear></InputPassword>
  </FormItem>
</template>
