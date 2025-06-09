<script setup lang="ts">
import FormItem from "@arco-design/web-vue/es/form/form-item";
import Row from "@arco-design/web-vue/es/grid/grid-row";
import Col from "@arco-design/web-vue/es/grid/grid-col";
import InputNumber from "@arco-design/web-vue/es/input-number/input-number";
import type { FieldRule } from "@arco-design/web-vue/es/form/interface";
import { computed } from "vue";

import { useFormItemInject } from "./use";

interface QFormDigitRangeProps {
  name: string;
  label: string;
  tooltip?: string;
  disabled?: boolean;
  help?: string;
  extra?: string;
  rules?: FieldRule | FieldRule[];
}

const { name } = defineProps<QFormDigitRangeProps>();

const value = useFormItemInject<[number, number]>(() => name);

const vmin = computed({ get: () => value.value?.[0], set: (v) => (value.value = [v, value.value?.[1]]) });
const vmax = computed({ get: () => value.value?.[1], set: (v) => (value.value = [value.value?.[0], v]) });

const onBlur = () => {
  if (!vmin.value || !vmax.value) return;
  if (vmin.value > vmax.value) value.value = [vmax.value, vmin.value];
};
</script>

<template>
  <FormItem :field="name" :label="label" :tooltip="tooltip" :disabled="disabled" :help="help" :extra="extra" :rules="rules">
    <Row align="center" :gutter="8" :wrap="false" style="flex: auto">
      <Col flex="auto">
        <InputNumber v-model="vmin" placeholder="最小值" allow-clear @blur="onBlur"></InputNumber>
      </Col>
      <Col flex="none">~</Col>
      <Col flex="auto">
        <InputNumber v-model="vmax" placeholder="最大值" allow-clear @blur="onBlur"></InputNumber>
      </Col>
    </Row>
  </FormItem>
</template>
