import { Button, Col, Form, FormItem, Grid, GridItem, Input, InputNumber, Row, Select } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/form/style/css";
import "@arco-design/web-vue/es/grid/style/css";
import "@arco-design/web-vue/es/input-number/style/css";
import "@arco-design/web-vue/es/input/style/css";
import { defineComponent, ref, watch } from "vue";
import { useTableProvide } from "./hooks";
import { pick } from "./utils";

const TypeField = defineComponent({
  name: "TypeField",
  props: {
    type: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: [String, Number], default: () => void 0 },
    dict: { type: Array, default: () => [] },
  },
  emits: {
    "update:value": true,
  },
  setup(props, { emit }) {
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
      if (props.type === "select") return <Select modelValue={value.value} onUpdate:modelValue={onUpdate} options={props.dict} placeholder="请选择" />;
      if (props.type === "number") return <InputNumber modelValue={value.value} onUpdate:modelValue={onUpdate} placeholder="请输入" />;
      return <Input modelValue={value.value} onUpdate:modelValue={onUpdate} placeholder="请输入" />;
    };
  },
});

export const QQuery = defineComponent({
  name: "QQuery",

  props: {
    columns: { type: Array, required: true },
    form: { type: Object, required: true },
    dicts: { type: Object, default: () => ({}) },
  },

  setup(props) {
    const cols = ref([]);

    watch(
      () => props.columns,
      (v) => {
        const now = [];
        for (const c of v) {
          if (!c.type) continue;
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
          <FormItem label={x.title}>
            <TypeField name={x.key} type={x.type} value={props.form[x.key]} dict={props.dicts[x.key]} onUpdate:value={ctx.form} />
          </FormItem>
        </GridItem>
      );
    };

    const collapsed = ref(true);

    const span = { xs: 1, sm: 1, md: 2, xl: 3, xxl: 4 };

    return () => (
      <Form model={props.form}>
        <Grid cols={span} collapsed={collapsed.value}>
          {cols.value.map(cols$)}
          <GridItem key="collapsed" suffix>
            <Row gutter={8} justify="end">
              <Col flex="none">
                <Button type="primary">查询</Button>
              </Col>
              <Col flex="none">
                <Button>重置</Button>
              </Col>
            </Row>
          </GridItem>
        </Grid>
      </Form>
    );
  },
});
