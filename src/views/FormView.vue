<script setup lang="ts">
import { Button, Input } from "@arco-design/web-vue";
import { QForm, QFormDigit, QFormItem, QFormText, QFormTextArea } from "../../lib/form";
</script>

<template>
  <QForm>
    <QFormItem name="item" label="Item">
      <Input></Input>
    </QFormItem>
    <QFormText name="name" label="Name" />
    <QFormDigit name="digit" label="Digit" />
    <QFormTextArea name="text" label="Text" />

    <template #footer>
      <Button html-type="reset">重置</Button>
    </template>
  </QForm>
</template>
