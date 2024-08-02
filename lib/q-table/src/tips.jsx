import { Alert, Col, Row, Space } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/alert/style/css";
import "@arco-design/web-vue/es/grid/style/css";
import { defineComponent } from "vue";

export const QTips = defineComponent(
  (props) => {
    return () => {
      return (
        <Alert type="normal">
          <Row align="center" justify="space-between">
            <Col flex="auto">
              <Space>
                <span>已选择</span>
                <span>{props.selected}</span>
                <span>项</span>
              </Space>
            </Col>
            {props.selected > 0 && (
              <Col flex="none">
                <a>取消选择</a>
              </Col>
            )}
          </Row>
        </Alert>
      );
    };
  },
  {
    name: "QranyTips",
    props: {
      selected: { type: Number, default: 0 },
    },
  },
);
