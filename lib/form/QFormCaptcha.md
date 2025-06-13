```vue
<script setup lang="ts">
import { QForm, QFormCaptcha } from "qrany-arcov/form";

/** 获取验证码 */
const getCaptcha = async (phone: string) => {
  console.log(phone);
};

/** 倒计时展示 */
const text = (end: number) => {
  if (end <= 0) return `获取验证码`;
  return `请${end}秒后重试`;
};
</script>

<template>
  <QForm>
    <QFormCaptcha name="phone" label="电话号码" :text="text" :get-captcha="getCaptcha"></QFormCaptcha>
  </QForm>
</template>
```
