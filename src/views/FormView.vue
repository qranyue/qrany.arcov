<script setup lang="ts">
import { Button, Input } from "@arco-design/web-vue";
import { QForm, QFormDigit, QFormItem, QFormText, QFormTextArea } from "../../lib/form";

interface FormValues {
  item: string;
  name: string;
  digit: number;
  text: string;
}

const onSubmit = (values: FormValues) => {
  console.log(values);
};

const request = async () => {
  return {
    item: "item",
    name: "name",
    digit: 1,
    text: "text",
  } as FormValues;
};
</script>

<template>
  <QForm :request="request" @submit="onSubmit">
    <QFormItem name="item" label="Item">
      <Input></Input>
    </QFormItem>
    <QFormText name="name" label="Name" />
    <QFormDigit name="digit" label="Digit" />
    <QFormTextArea name="text" label="Text" />

    <template #footer>
      <Button html-type="reset">重置</Button>
      <Button html-type="submit" type="primary">提交</Button>
    </template>
  </QForm>
</template>
