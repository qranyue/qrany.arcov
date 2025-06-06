<script setup lang="ts">
import type { FieldRule } from "@arco-design/web-vue/es/form/interface";
import FormItem from "@arco-design/web-vue/es/form/form-item";
import { defineComponent, h, type Slot } from "vue";

import { useFormItemInject } from "./use";

interface QFormItemProps {
  name: string;
  label: string;
  tooltip?: string;
  disabled?: boolean;
  help?: string;
  extra?: string;
  rules?: FieldRule | FieldRule[];
}

const { name } = defineProps<QFormItemProps>();

const value = useFormItemInject(() => name);

interface QFormItemSlots {
  default: Slot;
}

const $slots = defineSlots<QFormItemSlots>();

const Component = defineComponent({
  name: "QFormItemField",
  setup() {
    const update = (v: unknown) => {
      value.value = v;
    };
    return () => {
      if (!$slots.default) return [];
      const v = $slots.default();
      if (!v[0]) return [];
      return [h(v[0], { modelValue: value.value, "onUpdate:modelValue": update })];
    };
  },
});
</script>

<template>
  <FormItem :field="name" :label="label" :tooltip="tooltip" :disabled="disabled" :help="help" :extra="extra" :rules="rules">
    <component :is="Component"></component>
  </FormItem>
</template>
