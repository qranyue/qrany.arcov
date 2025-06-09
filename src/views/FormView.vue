<script setup lang="ts">
import { Button, Card, Col, Input, Row } from "@arco-design/web-vue";
import {
  QForm,
  QFormDatePicker,
  QFormDateTimePicker,
  QFormDateTimeRangePicker,
  QFormDigit,
  QFormDigitRange,
  QFormItem,
  QFormMonthPicker,
  QFormMonthRangePicker,
  QFormPassword,
  QFormQuarterPicker,
  QFormQuarterRangePicker,
  QFormText,
  QFormTextArea,
  QFormTimePicker,
  QFormTimeRangePicker,
  QFormWeekPicker,
  QFormYearPicker,
  QFormYearRangePicker,
} from "../../lib/form";
import QFormDateRangePicker from "../../lib/form/QFormDateRangePicker.vue";

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
  <section style="padding: 24px">
    <QForm auto :request="request" @submit="onSubmit">
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
            <QFormDateTimePicker name="date-time" label="DateTime" />
          </Col>
          <Col :span="8">
            <QFormYearPicker name="year" label="Year" />
          </Col>
          <Col :span="8">
            <QFormQuarterPicker name="quarter" label="Quarter" />
          </Col>
          <Col :span="8">
            <QFormMonthPicker name="month" label="Month" />
          </Col>
          <Col :span="8">
            <QFormWeekPicker name="week" label="Week" />
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
            <QFormDateTimeRangePicker name="date-time-range" label="DateTime" />
          </Col>
          <Col :span="8">
            <QFormYearRangePicker name="year-range" label="Year" />
          </Col>
          <Col :span="8">
            <QFormQuarterRangePicker name="quarter-range" label="Quarter" />
          </Col>
          <Col :span="8">
            <QFormMonthRangePicker name="month-range" label="Month" />
          </Col>
          <Col :span="8">
            <QFormWeekPicker name="week" label="Week" />
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

      <template #footer>
        <Button html-type="reset">重置</Button>
        <Button html-type="submit" type="primary">提交</Button>
      </template>
    </QForm>
  </section>
</template>
