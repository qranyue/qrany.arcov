<script setup lang="ts">
import { Col, Row } from "@arco-design/web-vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Row align="center" justify="center" :gutter="20">
    <Col flex="none">
      <RouterLink to="/">Home</RouterLink>
    </Col>
    <Col flex="none">
      <RouterLink to="/form">Form</RouterLink>
    </Col>
  </Row>

  <RouterView />
</template>

<style></style>
