<script setup lang="ts">
import { QTable, type Column, type QTableRequest } from "@/index";

const columns: Column[] = [{ key: "text", title: "Text" }];

const request: QTableRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: Array.from({ length: 10 }, (_, i) => {
          return {
            text: `Text ${i + 1}`,
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
