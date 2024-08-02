import { Dropdown, Image, ImagePreviewGroup, Space, Tooltip } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/button/style/css";
import "@arco-design/web-vue/es/dropdown/style/css";
import "@arco-design/web-vue/es/image/style/css";
import "@arco-design/web-vue/es/space/style/css";
import "@arco-design/web-vue/es/tooltip/style/css";
import { computed, defineComponent } from "vue";
import { digit, parse_images } from "./utils";

const QImage = defineComponent(
  (props) => {
    const value = computed(() => parse_images(props.value)[0]);
    return () => {
      return (
        <Tooltip content={value.value?.name}>
          <Image src={value.value?.url} alt={value.value?.name} fit="cover" width={50} height={50} />
        </Tooltip>
      );
    };
  },
  {
    name: "QranyImage",

    props: {
      value: { type: [String, Array], default: "" },
    },
  },
);

const QImages = defineComponent(
  (props) => {
    const value = computed(() => parse_images(props.value).slice(0, 3));

    const image$ = (x) => {
      return (
        <Tooltip content={x.name}>
          <Image src={x.url} alt={x.name} fit="cover" width={50} height={50} />
        </Tooltip>
      );
    };

    return () => {
      return (
        <ImagePreviewGroup infinite>
          <Space>{value.value.map(image$)}</Space>
        </ImagePreviewGroup>
      );
    };
  },
  {
    name: "QranyImages",
    props: {
      value: { type: [String, Array], default: "" },
    },
  },
);

export const QRender = defineComponent(
  (props) => {
    return () => {
      if (props.type === "image") return <QImage value={props.value} />;
      if (props.type === "images") return <QImages value={props.value} />;
      if (/number|digit/.test(props.type)) return digit(props.value);
      return props.dict[props.value] || props.value;
    };
  },
  {
    name: "QranyRender",

    props: {
      type: { type: String, default: "text" },
      value: { type: [String, Number], default: () => void 0 },
      dict: { type: Object, default: () => ({}) },
    },
  },
);

export const QActions = defineComponent(
  (_, { slots }) => {
    const dropdown$ = (more = []) => ({
      default: () => (
        <Button type="text">
          更多 <IconDown />
        </Button>
      ),
      content: () => more.map((x) => <Doption>{x}</Doption>),
    });

    return () => {
      const c = slots.default?.();
      if (!c) return c;
      if (!c.length) return c;
      if (c.length === 1) return c[0];
      if (c.length <= 3) return <Space>{c}</Space>;
      const [b, a] = [c.slice(0, 2), c.slice(2)];
      return (
        <Space>
          {b}
          <Dropdown>{dropdown$(a)}</Dropdown>
        </Space>
      );
    };
  },
  {
    name: "QranyActions",
  },
);
