import { Button, Cascader, Col, Form, FormItem, Grid, GridItem, Input, InputNumber, RangePicker, Row, Select } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/button/style/css";
import "@arco-design/web-vue/es/cascader/style/css";
import "@arco-design/web-vue/es/date-picker/style/css";
import "@arco-design/web-vue/es/form/style/css";
import "@arco-design/web-vue/es/grid/style/css";
import IconDown from "@arco-design/web-vue/es/icon/icon-down";
import IconUp from "@arco-design/web-vue/es/icon/icon-up";
import "@arco-design/web-vue/es/input-number/style/css";
import "@arco-design/web-vue/es/input/style/css";
import { defineComponent, ref, watch } from "vue";
import { useTableProvide } from "./hooks";
import { pick } from "./utils";

const FieldDigit = defineComponent(
  (props, { emit }) => {
    const value = ref([]);

    watch(
      () => props.value,
      (v) => {
        if (v.join(",") === value.value.join(",")) return;
        value.value = v;
      },
      { immediate: true },
    );

    const on_blur = () => {
      emit("update:value", [...value.value].sort());
    };

    const on_update0 = (v) => {
      value.value[0] = v;
    };

    const on_update1 = (v) => {
      value.value[1] = v;
    };

    return () => (
      <Row gutter={8}>
        <Col span={12}>
          <InputNumber modelValue={value.value[0]} onUpdate:modelValue={on_update0} onBlur={on_blur} allowClear placeholder="最小值" />
        </Col>
        <Col span={12}>
          <InputNumber modelValue={value.value[1]} onUpdate:modelValue={on_update1} onBlur={on_blur} allowClear placeholder="最大值" />
        </Col>
      </Row>
    );
  },
  {
    name: "FieldDigst",
    props: {
      value: { type: Array, default: () => [] },
    },
    emits: {
      "update:value": (v) => Array.isArray(v),
    },
  },
);

const TypeField = defineComponent(
  (props, { emit }) => {
    const value = ref(void 0);

    watch(
      () => props.value,
      (v) => {
        if (JSON.stringify(value.value) === JSON.stringify(v)) return;
        value.value = v;
      },
      { immediate: true },
    );

    const onUpdate = (v) => {
      value.value = v;
      emit("update:value", { [props.name]: v });
    };

    return () => {
      if (props.type === "number") return <InputNumber modelValue={value.value} onUpdate:modelValue={onUpdate} allowClear placeholder="请输入" />;
      if (props.type === "digit") return <FieldDigit value={value.value} onUpdate:value={onUpdate} placeholder="请输入" />;
      if (props.type === "select") return <Select modelValue={value.value} onUpdate:modelValue={onUpdate} options={props.dict} allowClear placeholder="请选择" />;
      if (props.type === "cascader") return <Cascader modelValue={value.value} onUpdate:modelValue={onUpdate} options={props.dict} allowClear placeholder="请选择" />;
      if (props.type === "range-picker") return <RangePicker modelValue={value.value} onUpdate:modelValue={onUpdate} />;
      return <Input modelValue={value.value} onUpdate:modelValue={onUpdate} placeholder="请输入" />;
    };
  },
  {
    name: "TypeField",
    props: {
      type: { type: String, required: true },
      name: { type: String, required: true },
      value: { type: [String, Number, Array], default: () => void 0 },
      dict: { type: Array, default: () => [] },
    },
    emits: {
      "update:value": () => true,
    },
  },
);

export const QQuery = defineComponent(
  (props, { emit }) => {
    const cols = ref([]);

    watch(
      () => props.columns,
      (v) => {
        const now = [];
        for (const c of v) {
          if (!/text|number|digit|range-picker|select|cascader/.test(c.type)) continue;
          const x = pick(c, "key", "title", "type");
          now.push(x);
        }
        cols.value = now;
      },
      { immediate: true, deep: true },
    );

    const ctx = useTableProvide();

    const cols$ = (x) => {
      return (
        <GridItem key={x.key}>
          <FormItem field={x.key} label={x.title}>
            <TypeField name={x.key} type={x.type} value={props.form[x.key]} dict={props.dicts[x.key]} onUpdate:value={ctx.form} />
          </FormItem>
        </GridItem>
      );
    };

    const on_query = () => emit("query");

    const on_reload = () => emit("reload");

    const collapsed = ref(true);

    const on_collapsed = () => {
      collapsed.value = !collapsed.value;
    };

    const form_col = {
      labelColProps: { span: 8 },
      wrapperColProps: { span: 16 },
    };

    const span = { xs: 1, sm: 1, md: 2, xl: 3, xxl: 4 };

    const collapsed$ = {
      icon: () => (collapsed.value ? <IconDown /> : <IconUp />),
      default: () => (collapsed.value ? "展开" : "收起"),
    };

    return () => (
      <Form model={props.form} {...form_col} onSubmitSuccess={on_query}>
        <Grid cols={span} collapsed={collapsed.value}>
          {cols.value.map(cols$)}
          <GridItem key="collapsed" suffix>
            <Row gutter={8} justify="end">
              <Col flex="none">
                <Button type="primary" loading={props.loading} onClick={on_query}>
                  查询
                </Button>
              </Col>
              <Col flex="none">
                <Button onClick={on_reload}>重置</Button>
              </Col>
              <Col flex="none">
                <Button type="text" onClick={on_collapsed}>
                  {collapsed$}
                </Button>
              </Col>
            </Row>
          </GridItem>
        </Grid>
      </Form>
    );
  },
  {
    name: "QQuery",

    props: {
      loading: { type: Boolean, default: false },
      columns: { type: Array, required: true },
      form: { type: Object, required: true },
      dicts: { type: Object, default: () => ({}) },
    },

    emits: {
      query: () => true,
      reload: () => true,
    },
  },
);
