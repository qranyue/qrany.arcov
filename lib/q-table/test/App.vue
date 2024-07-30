<script setup lang="ts">
import { QTable, type Column, type QTableRequest } from "@/index";

const select_options: [number, string][] = [
  [0, "ling"],
  [1, "yi"],
  [2, "er"],
];

const columns: Column[] = [
  { key: "text", title: "Text", type: "text" },
  { key: "number", title: "Number", type: "number" },
  { key: "select", title: "Select", type: "select", query: { request: async () => select_options } },
];

const request: QTableRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: Array.from({ length: 10 }, (_, i) => {
          return {
            text: `Text ${i} 人家我绝对时空观很早大概好久哦欸我日将提供解耦啊我就共自动检测分工睡觉哦通过`,
            number: Math.random() * 1e6,
            select: i % 3,
          };
        }),
        total: 20,
      });
    }, 1000);
  });
};
</script>

<template>
  <QTable :columns="columns" :request="request"></QTable>
</template>

<style scoped></style>
