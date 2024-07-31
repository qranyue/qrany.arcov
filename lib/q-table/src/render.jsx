import { computed, defineComponent } from "vue";
import { digit, get_images } from "./utils";

const RenderImage = defineComponent({
  name: "RenderImage",

  props: {
    value: { type: [String, Array], required: true },
  },

  setup(props) {
    const value = computed(() => get_images(props.value)[0]);
    return () => {
      if (value.value?.url) return <img src={value.value.url} />;
      return <div>暂无图片</div>;
    };
  },
});

export const TableRender = defineComponent({
  name: "TableRender",

  props: {
    type: { type: String, required: true },
    value: { type: [String, Number], default: () => void 0 },
    dict: { type: Object, default: () => ({}) },
  },

  setup(props) {
    return () => {
      if (props.type === "image") return <RenderImage value={props.value} />;
      if (/number|digit/.test(props.type)) return digit(props.value);
      return props.dict[props.value] || props.value;
    };
  },
});
