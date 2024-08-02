import { Checkbox, CheckboxGroup, Popover, Space, Tooltip } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/checkbox/style/css";
import IconSettings from "@arco-design/web-vue/es/icon/icon-settings";
import "@arco-design/web-vue/es/popover/style/css";
import "@arco-design/web-vue/es/space/style/css";
import "@arco-design/web-vue/es/tooltip/style/css";
import { defineComponent } from "vue";

export const QSets = defineComponent(
  (props) => {
    const cols$ = (x) => {
      return (
        <div key={x[0]}>
          <Checkbox value={x[0]}>{x[1]}</Checkbox>
        </div>
      );
    };

    const settings$ = {
      title: () => <Checkbox>全选</Checkbox>,
      content: () => <CheckboxGroup>{props.cols.map(cols$)}</CheckboxGroup>,
      default: () => <IconSettings size={16} />,
    };

    return () => {
      return (
        <Space>
          <Tooltip content="列设置">
            <Popover position="tr">{settings$}</Popover>
          </Tooltip>
        </Space>
      );
    };
  },
  {
    name: "QranySets",
    props: {
      cols: { type: Array, default: () => [] },
      sorts: { type: Array, default: () => [] },
    },
  },
);
