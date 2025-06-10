<script setup lang="ts">
import { Button, Card, Col, Input, Row, Space } from "@arco-design/web-vue";
import {
  QForm,
  QFormDatePicker,
  QFormDateRangePicker,
  QFormDigit,
  QFormDigitRange,
  QFormItem,
  QFormPassword,
  QFormSelect,
  QFormText,
  QFormTextArea,
  QFormTimePicker,
  QFormTimeRangePicker,
} from "../../lib/form";

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

const select = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    a: "0",
    b: "1",
  };
};
</script>

<template>
  <section style="padding: 24px">
    <QForm :request="request" auto @submit="onSubmit">
      <Card title="文本">
        <Row :gutter="16">
          <Col :span="8">
            <QFormText name="name" label="Name" />
          </Col>
          <Col :span="8">
            <QFormPassword name="password" label="Password" />
          </Col>
          <Col :span="24">
            <QFormTextArea name="text" label="Text" />
          </Col>
        </Row>
      </Card>

      <Card title="选择" style="margin-top: 24px">
        <Row :gutter="16">
          <Col :span="8">
            <QFormSelect name="select" label="Select" :request="select" />
          </Col>
        </Row>
      </Card>

      <Card title="数值" style="margin-top: 24px">
        <Row :gutter="16">
          <Col :span="8">
            <QFormDigit name="digit" label="Digit" />
          </Col>
          <Col :span="8">
            <QFormDigitRange name="digit-range" label="DigitRange" />
          </Col>
        </Row>
      </Card>

      <Card title="时间" style="margin-top: 24px">
        <Row :gutter="16">
          <Col :span="8">
            <QFormTimePicker name="time" label="Time" />
          </Col>
          <Col :span="8">
            <QFormDatePicker name="date-time" label="DateTime" show-time />
          </Col>
          <Col :span="8">
            <QFormDatePicker name="year" label="Year" mode="year" />
          </Col>
          <Col :span="8">
            <QFormDatePicker name="quarter" label="Quarter" mode="quarter" />
          </Col>
          <Col :span="8">
            <QFormDatePicker name="month" label="Month" mode="month" />
          </Col>
          <Col :span="8">
            <QFormDatePicker name="week" label="Week" mode="week" />
          </Col>
          <Col :span="8">
            <QFormDatePicker name="date" label="Date" />
          </Col>
        </Row>
      </Card>

      <Card title="时间范围" style="margin-top: 24px">
        <Row :gutter="16">
          <Col :span="8">
            <QFormTimeRangePicker name="time-range" label="Time" />
          </Col>
          <Col :span="8">
            <QFormDateRangePicker name="date-time-range" label="DateTime" show-time />
          </Col>
          <Col :span="8">
            <QFormDateRangePicker name="year-range" label="Year" mode="year" />
          </Col>
          <Col :span="8">
            <QFormDateRangePicker name="quarter-range" label="Quarter" mode="quarter" />
          </Col>
          <Col :span="8">
            <QFormDateRangePicker name="month-range" label="Month" mode="month" />
          </Col>
          <Col :span="8">
            <QFormDateRangePicker name="week-range" label="Week" mode="week" />
          </Col>
          <Col :span="8">
            <QFormDateRangePicker name="date-range" label="Date" />
          </Col>
        </Row>
      </Card>

      <Card title="自定义" style="margin-top: 24px">
        <Row :gutter="16">
          <Col :span="24">
            <QFormItem name="item" label="Item">
              <Input></Input>
            </QFormItem>
          </Col>
        </Row>
      </Card>

      <Card style="margin-top: 24px">
        <Space>
          <Button html-type="reset">重置</Button>
          <Button html-type="submit" type="primary">提交</Button>
        </Space>
      </Card>
    </QForm>
  </section>
</template>
