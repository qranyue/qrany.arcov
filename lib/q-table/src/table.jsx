import { Card, Table, TableColumn } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/card/style/css";
import "@arco-design/web-vue/es/table/style/css";
import { defineComponent, reactive, watch } from "vue";
import { useTableContext } from "./hooks";
import { QQuery } from "./query";
import { TableRender } from "./render";
import { get_dicts, is_null, pick } from "./utils";

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

  setup(props, { slots }) {
    const [table, ctx] = useTableContext(props.table);

    const other = {};
    const data = reactive({
      loading: false,
      sets: [],
      sorts: [],
      cols: {},
      data: [],
    });
    const pagi = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
    });

    const parse = (form) => {
      const old = { ...table.form, ...form };
      const now = {};
      for (const c of props.columns) {
        if (typeof c.query?.transform === "function") Object.assign(now, c.query.transform(old));
        else if (!is_null(old[c.key])) now[c.key] = old[c.key];
      }
      now.current = pagi.current;
      now.pageSize = pagi.pageSize;
      return now;
    };

    const query = async (page = pagi.current, form = {}) => {
      try {
        data.loading = true;
        if (page !== pagi.current) pagi.current = page;
        const promise = props.request(parse(form), other.filter, other.sorter);
        data.data = (await promise).data;
        pagi.total = (await promise).total;
        return await promise;
      } finally {
        data.loading = false;
      }
    };

    const reload = () => {
      ctx.form(void 0, "set");
      ctx.select([], []);
      return query(1);
    };

    ctx.config({
      query,
      reload,
    });

    const dicts = reactive({
      options: {},
      filter: {},
      enum: {},
    });

    const set_dicts = async (c) => {
      if (!c.props?.options && !c.query?.request) return;
      const before = get_dicts(c.props?.options);
      dicts.options[c.key] = before.options;
      dicts.filter[c.key] = before.filter;
      dicts.enum[c.key] = before.enum;
      const promise = c.query?.request?.(table.form);
      if (!promise) return;
      const after = get_dicts(await promise);
      dicts.options[c.key] = after.options;
      dicts.filter[c.key] = after.filter;
      dicts.enum[c.key] = after.enum;
    };

    watch(
      () => props.columns,
      (v) => {
        const [sets, sorts, cols, def] = [[], [], {}, {}];
        for (const c of v) {
          const x = pick(c, "key", "title", "type", "width", "minWidth", "align", "fixed");
          set_dicts(c);
          if (c.hide === true) continue;
          if (!is_null(c.query?.default)) def[c.key] = c.query.default;
          if (c.sorter) x.sortable = { sorter: c.sorter };
          cols[x.key] = x;
          sets.push([x.key, x.title]);
          sorts.push(x.key);
        }
        ctx.config({ def });
        data.cols = cols;
        data.sets = sets;
        data.sorts = sorts;
      },
      { immediate: true },
    );

    watch(
      () => props.params,
      (v) => {
        ctx.config({ params: v });
        ctx.form();
        if (props.initial) query(1);
      },
      { immediate: true },
    );

    const on_page_change = (page) => {
      query(page);
    };
    const on_page_size_change = (size) => {
      pagi.pageSize = size;
      query();
    };

    const cell$ = ({ record, column }) => {
      const k = column.dataIndex;
      const c = data.cols[k];
      return slots.body?.({ key: k, record, dicts: dicts.enum }) || <TableRender type={c.type} value={record[k]} dict={dicts.enum[k]} />;
    };

    const column$ = (k) => {
      const x = data.cols[k];
      return (
        <TableColumn key={x.key} dataIndex={x.key} {...pick(x, "title", "width", "minWidth", "align", "fixed")}>
          {{ cell: cell$ }}
        </TableColumn>
      );
    };

    const columns$ = () => data.sorts.map(column$);

    const table$ = () => {
      return (
        <Table loading={data.loading} data={data.data} pagination={getPagination(pagi)} bordered={false} onPageChange={on_page_change} onPageSizeChange={on_page_size_change}>
          {{ columns: columns$ }}
        </Table>
      );
    };

    return () => {
      return (
        <>
          <Card>
            <QQuery loading={data.loading} columns={props.columns} form={table.form} dicts={dicts.options} onQuery={query} onReload={reload} />
          </Card>
          <Card style={{ "margin-top": "24px" }}>{table$()}</Card>
        </>
      );
    };
  },
});
