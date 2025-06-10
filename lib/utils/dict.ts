import type { SelectOptionData } from "@arco-design/web-vue/es/select/interface";
import type { TreeNodeData } from "@arco-design/web-vue/es/tree/interface";

export type DictType = Record<string, string> | [string, string][] | SelectOptionData[];

export const parseDict = (dict: DictType) => {
  if (!Array.isArray(dict)) dict = Object.entries(dict);
  if (!Array.isArray(dict[0])) return dict as SelectOptionData[];
  return (dict as [string, string][]).map<SelectOptionData>(([value, label]) => ({ label, value }));
};

type TreeDictData = Record<string, [string, string][]>;

export type TreeDictType = TreeDictData | [string, string, string][] | TreeNodeData[];

export const parseTree = (tree: TreeDictType) => {
  let dict = {} as TreeDictData;
  if (!Array.isArray(tree)) [dict, tree] = [tree, []];
  if (!Array.isArray(tree[0])) return tree as TreeNodeData[];
  for (const [k, v, p = ""] of tree as [string, string, string][]) {
    dict[p] ??= [];
    dict[p].push([k, v]);
  }
  const parse = (key: string, parent: TreeNodeData) => {
    const children = dict[key];
    if (!children) return parent;
    for (const [k, v] of children) {
      const node: TreeNodeData = { key: k, title: v };
      parse(k, node);
      parent.children ??= [];
      parent.children.push(node);
    }
    return parent;
  };
  return parse("", { children: [] }).children!;
};
