import { inject, provide, reactive } from "vue";

const PROVIDE = Symbol("TABLE_CONTEXT");
const CONTEXT = new WeakMap();

export const useTable = () => {
  const opt = {};

  const e = {
    emit: (name, ...args) => {
      if (opt[name]) return opt[name](...args);
      return new Promise((resolve) => {
        e[name] ??= [];
        e[name].push([resolve, args]);
      });
    },
  };

  const table = reactive({
    form: {},

    selectedRowKeys: [],
    selections: [],

    query: (form) => e.emit("query", form),
    reload: () => e.emit("reload"),
  });

  CONTEXT.set(table, {
    form: (form, type = "add") => {
      if (type === "set") table.form = { ...opt.def, ...form, ...opt.params };
      if (type === "add") table.form = { ...opt.def, ...table.form, ...form, ...opt.params };
    },
    select: (keys, rows) => {
      table.selectedRowKeys = keys;
      table.selections = rows;
    },

    config: (config) => {
      for (const [k, v] of Object.entries(config)) {
        if (typeof v === "object") opt[k] = { ...v };
        else opt[k] = v;
        if (typeof v !== "function" || !e[k]) continue;
        for (const fs of e[k]) (async () => await fs[0](await v(...fs[1])))();
        delete e[k];
      }
    },
  });

  return table;
};

export const useTableContext = (table = useTable()) => {
  const ctx = CONTEXT.get(table);
  provide(PROVIDE, ctx);
  return [table, ctx];
};

export const useTableProvide = () => inject(PROVIDE);
