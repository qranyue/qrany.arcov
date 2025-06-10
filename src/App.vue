<script setup lang="ts">
import { Col, Row } from "@arco-design/web-vue";
import { RouterView } from "vue-router";
</script>

<template>
  <section style="padding: 12px 24px; background-color: white">
    <Row align="center" justify="center" :gutter="20">
      <Col flex="none">
        <RouterLink to="/">Home</RouterLink>
      </Col>
      <Col flex="none">
        <RouterLink to="/form">Form</RouterLink>
      </Col>
    </Row>
  </section>

  <RouterView />
</template>

<style></style>
