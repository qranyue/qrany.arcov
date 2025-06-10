<script setup lang="ts" generic="F">
import FormItem from "@arco-design/web-vue/es/form/form-item";
import TreeSelect from "@arco-design/web-vue/es/tree-select/tree-select";
import type { FieldRule } from "@arco-design/web-vue/es/form/interface";
import type { TreeNodeData } from "@arco-design/web-vue/es/tree/interface";
import { shallowRef, watchEffect } from "vue";

import { useFormItemInject } from "./use";
import { parseTree, tryPromise, type TreeDictType } from "../utils";

interface QFormSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  tooltip?: string;
  disabled?: boolean;
  help?: string;
  extra?: string;
  rules?: FieldRule | FieldRule[];

  multiple?: boolean;
  enum?: TreeDictType;
  params?: F;
  request?: (params?: F) => Promise<TreeDictType>;

  virtual?: boolean;
}

const { name, params, enum: valueEnum, request } = defineProps<QFormSelectProps>();

const data = shallowRef([] as TreeNodeData[]);

watchEffect(() => {
  if (!valueEnum) return;
  data.value = parseTree(valueEnum);
});

const loading = shallowRef(false);
watchEffect(async () => {
  if (!request) return;
  loading.value = true;
  const [v] = await tryPromise(request(params));
  if (v) data.value = parseTree(v);
  loading.value = false;
});

const value = useFormItemInject(() => name);

const treeProps = { virtualListProps: {} };
</script>

<template>
  <FormItem :field="name" :label="label" :tooltip="tooltip" :disabled="disabled" :help="help" :extra="extra" :rules="rules">
    <TreeSelect
      v-model="value"
      :data="data"
      :multiple="multiple"
      :placeholder="placeholder"
      :loading="loading"
      :tree-props="(virtual && treeProps) || void 0"
      allow-clear
      allow-search
    ></TreeSelect>
  </FormItem>
</template>
