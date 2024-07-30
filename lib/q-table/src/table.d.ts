import type { DefineComponent } from "vue";
import type { QColumn } from "./column";
import type { UseTable } from "./hooks";

export const defaultPagination: (pagination: {}) => void;

type QTablePagination = { current: number; pageSize: number };

export type QTableRequest = (params: {} & QTablePagination, filter: {}, sorter: {}) => Promise<{ data: unknown[]; total: number }>;

type QTableProps = {
  /**
   * 表格基本使用
   * @default object
   */
  table?: UseTable;

  /**
   * 行主键
   * @default "id"
   */
  rowKey?: string;

  /**
   * 表格列
   */
  columns: QColumn[];

  /**
   * 请求函数
   */
  request: QTableRequest;

  /**
   * 覆盖参数
   */
  params?: Record<string, unknown>;

  /**
   * 初始加载
   * @default true
   */
  initial?: boolean;
};

export const QTable: DefineComponent<QTableProps, {}, {}, {}, {}, {}, {}>;
