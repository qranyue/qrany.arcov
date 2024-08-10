import { Button, Doption, Dropdown, Image, ImagePreviewGroup, Space, Tooltip } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/button/style/css";
import "@arco-design/web-vue/es/dropdown/style/css";
import "@arco-design/web-vue/es/image/style/css";
import "@arco-design/web-vue/es/space/style/css";
import "@arco-design/web-vue/es/tooltip/style/css";
import { cloneVNode, computed, defineComponent } from "vue";
import style from "./render.module.css";
import { digit, filter_vnodes, parse_images } from "./utils";

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

const QEllipsis = defineComponent(
  (props) => {
    return () => {
      return (
        <Tooltip content={`${props.value}`}>
          <div class={style["q-ellipsis"]} style={{ "-webkit-line-clamp": props.ellipsis }}>{`${props.value}`}</div>
        </Tooltip>
      );
    };
  },
  {
    name: "QranyEllipsis",
    props: {
      value: { type: [String, Number], default: () => void 0 },
      ellipsis: { type: Number, default: 0 },
    },
  },
);

export const QRender = defineComponent(
  (props) => {
    return () => {
      if (props.type === "image") return <QImage value={props.value} />;
      if (props.type === "images") return <QImages value={props.value} />;
      let v = props.value;
      if (/number|digit/.test(props.type)) v = digit(props.value);
      if (props.ellipsis) return <QEllipsis value={v} ellipsis={props.ellipsis} />;
      return v;
    };
  },
  {
    name: "QranyRender",

    props: {
      type: { type: String, default: "text" },
      value: { type: [String, Number], default: () => void 0 },
      ellipsis: { type: Number, default: 0 },
    },
  },
);

export const QAction = defineComponent(
  (props, { emit, slots }) => {
    const onClick = () => emit("click");
    return () => {
      if (props.type === "doption") return <Doption onClick={onClick}>{slots.default?.()}</Doption>;
      return (
        <Button type={props.type} onClick={onClick}>
          {slots.default?.()}
        </Button>
      );
    };
  },
  {
    name: "QranyAction",
    props: {
      type: { type: String, default: "secondary" },
    },
    emits: {
      click: () => true,
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
      content: () => more.map((x) => cloneVNode(x, { type: "doption" })),
    });

    return () => {
      const c = filter_vnodes(slots.default?.());
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
