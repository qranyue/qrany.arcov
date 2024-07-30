import { Card, Table, TableColumn } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/card/style/css";
import "@arco-design/web-vue/es/table/style/css";
import { defineComponent, reactive, watch } from "vue";
import { useTableContext } from "./hooks";
import { QQuery } from "./query";
import { TableRender } from "./render";
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
        const promise = props.request(parse(form), other.filter, other.sorter);
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
        ctx.form(void 0, "set");
        ctx.select([], []);
        return query();
      },
    });

    const dicts = reactive({
      options: {},
      filter: {},
      enum: {},
    });

    const getDicts = (v = []) => {
      const res = { options: [], filter: [], enum: {} };
      for (const x of v) {
        res.options.push({ value: x[0], label: x[1] });
        res.filter.push({ value: x[0], text: x[1] });
        res.enum[x[0]] = x[1];
      }
      return res;
    };
    const setDicts = async (c) => {
      if (!c.props?.options && !c.query?.request) return;
      const before = getDicts(c.props?.options);
      dicts.options[c.key] = before.options;
      dicts.filter[c.key] = before.filter;
      dicts.enum[c.key] = before.enum;
      const promise = c.query?.request?.(table.form);
      if (!promise) return;
      const after = getDicts(await promise);
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
          setDicts(c);
          if (c.hide === true) continue;
          if (!isNull(c.query?.default)) def[c.key] = c.query.default;
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
        if (props.initial) query();
      },
      { immediate: true },
    );

    const onPageChange = (page) => {
      pagi.current = page;
      query();
    };
    const onPageSizeChange = (size) => {
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
        <Table loading={data.loading} data={data.data} pagination={getPagination(pagi)} bordered={false} onPageChange={onPageChange} onPageSizeChange={onPageSizeChange}>
          {{ columns: columns$ }}
        </Table>
      );
    };

    return () => {
      return (
        <>
          <Card>
            <QQuery columns={props.columns} form={table.form} dicts={dicts.options} />
          </Card>
          <Card style={{ marginTop: "24px" }}>{table$()}</Card>
        </>
      );
    };
  },
});
