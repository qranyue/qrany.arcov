<script setup lang="ts">
import { QActions, QTable, type QColumn, type QTableRequest } from "@/index";
import "@arco-design/web-vue/es/button/style/css";

const select_options: [number, string][] = [
  [0, "ling"],
  [1, "yi"],
  [2, "er"],
];

const cascader_options: [number, string, number?][] = [
  [100, "百"],
  [110, "百一十", 100],
  [111, "百一十一", 110],
  [112, "百一十二", 110],
  [113, "百一十三", 110],
  [120, "百二十", 100],
  [121, "百二十一", 120],
  [122, "百二十二", 120],
  [123, "百二十三", 120],
  [130, "百三十", 100],
  [131, "百三十一", 130],
  [132, "百三十二", 130],
  [133, "百三十三", 130],
  [200, "二百"],
  [210, "二百一十", 200],
  [211, "二百一十一", 210],
  [212, "二百一十二", 210],
  [213, "二百一十三", 210],
  [220, "二百二十", 200],
  [230, "二百三十", 200],
  [300, "三百"],
  [310, "三百一十", 300],
  [320, "三百二十", 300],
  [330, "三百三十", 300],
];

const columns: QColumn[] = [
  { key: "text", title: "Text", type: "text" },
  { key: "number", title: "Number", type: "digit" },
  { key: "select", title: "Select", type: "select", query: { request: async () => select_options } },
  { key: "cascader", title: "Cascader", type: "cascader", query: { request: async () => cascader_options } },
  { key: "date", title: "Date", type: "range-picker" },
  { key: "image", title: "Image", type: "image" },
  { key: "images", title: "Images", type: "images" },
  { key: "action", title: "Action" },
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
            cascader: (1 + (i % 3)) * 100,
            date: new Date().toLocaleString(),
            image: "台灯|https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp",
            images:
              "城市|https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp,雪地|https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp,冰川|https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
          };
        }),
        total: 20,
      });
    }, 200);
  });
};
</script>

<template>
  <QTable :columns="columns" :request="request">
    <template #body="{ key }">
      <QActions v-if="key === 'action'" />
    </template>
  </QTable>
</template>

<style>
body {
  padding: 20px;
  background-color: #f0f0f0;
}
</style>

<style scoped></style>
