import { Card, Table, TableColumn } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/card/style/css";
import "@arco-design/web-vue/es/table/style/css";
import { defineComponent, reactive, watch } from "vue";
import { useTableContext } from "./hooks";
import { isNull, pick } from "./utils";

const pagination = { showPageSize: true, showTotal: true };
export const defaultPagination = (config) => {
  Object.assign(pagination, config);
};

const getPagination = (pagi) => ({ ...pagi, ...pagination });

export const QTable = defineComponent({
  name: "QTable",

  props: {
    table: { type: Object, default: void 0 },
    rowKey: { type: [String, Function], default: "id" },
    columns: { type: Array, required: true },
    request: { type: Function, required: true },

    params: { type: Object, default: () => ({}) },

    initial: { type: Boolean, default: true },
  },

  setup(props) {
    const [table, ctx] = useTableContext(props.table);

    const other = {};
    const data = reactive({
      loading: false,
      keys: [],
      cols: {},
      data: [],
    });
    const pagi = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
    });

    const parseForm = (form) => {
      const old = { ...table.form, ...form };
      const now = {};
      for (const c of props.columns) {
        if (c.query?.transform) Object.assign(now, c.query.transform(old));
        else if (!isNull(old[c.key])) now[c.key] = old[c.key];
      }
      now.current = pagi.current;
      now.pageSize = pagi.pageSize;
      return now;
    };

    const query = async (form) => {
      try {
        data.loading = true;
        const promise = props.request(parseForm(form), other.filter, other.sorter);
        data.data = (await promise).data;
        pagi.total = (await promise).total;
        return await promise;
      } finally {
        data.loading = false;
      }
    };

    ctx.config({
      query,
      reload: () => {
        pagi.current = 1;
        ctx.form({}, "set");
        ctx.select([], []);
        return query();
      },
    });

    watch(
      () => props.columns,
      (v) => {
        const [keys, cols, def] = [[], {}, {}];
        for (const c of v) {
          if (c.hide === true) continue;
          const x = pick(c, "key", "title", "width", "minWidth", "align", "fixed");
          if (!isNull(c.query?.default)) def[c.key] = c.query.default;
          if (c.sorter) x.sortable = { sorter: c.sorter };
          cols[x.key] = x;
          keys.push([x.key, x.title]);
        }
        ctx.config({ def });
        data.cols = cols;
        data.keys = keys;
      },
      { immediate: true },
    );

    watch(
      () => props.params,
      (v) => {
        ctx.config({ params: v });
        ctx.form();
        if (props.initial) query();
      },
      { immediate: true },
    );

    const column$ = (k) => {
      const x = data.cols[k[0]];
      return <TableColumn key={x.key} dataIndex={x.key} title={x.title}></TableColumn>;
    };

    const onPageChange = (page) => {
      pagi.current = page;
      query();
    };
    const onPageSizeChange = (size) => {
      pagi.pageSize = size;
      query();
    };

    const table$ = () => {
      return (
        <Table loading={data.loading} data={data.data} pagination={getPagination(pagi)} bordered={false} onPageChange={onPageChange} onPageSizeChange={onPageSizeChange}>
          {{ columns: () => data.keys.map(column$) }}
        </Table>
      );
    };

    return () => {
      return (
        <>
          <div></div>
          <Card>{[void 0, table$()]}</Card>
        </>
      );
    };
  },
});
