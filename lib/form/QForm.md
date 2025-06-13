```vue
<script setup lang="ts">
import { Button, Space } from "@arco-design/web-vue";
import { QForm, QFormText, useForm } from "qrany-arcov/form";

interface FormType {
  name: string;
}

/** 事件控制 */
const form = useForm<FormType>();

/** 清除校验 */
form.clear();
/** 设置字段值 */
form.fields({ name: "123456" });
/** 重置表单 */
form.reset();
/** 校验表单 */
form.validate();
/** 校验表单项 */
form.validates("name");

/** 获取远程数据作为初始化数据 */
const request = async () => {
  return { name: "123" } as FormType;
};

/** 提交事件 */
const onSubmit = (value: FormType) => {
  console.log(value);
};
</script>

<template>
  <QForm :form="form" :request="request" @submit="onSubmit">
    <QFormText name="name" label="name" />

    <Space>
      <Button html-type="reset">重置</Button>
      <Button type="primary" html-type="submit">提交</Button>
    </Space>
  </QForm>
</template>
```
