<script setup lang="ts">
import { Input } from "@arco-design/web-vue";
import { QForm, QFormDigit, QFormItem, QFormText } from "../../lib/form";
</script>

<template>
  <QForm>
    <QFormItem name="item" label="Item">
      <Input></Input>
    </QFormItem>
    <QFormText name="name" label="Name" />
    <QFormDigit name="digit" label="Digit" />
  </QForm>
</template>
