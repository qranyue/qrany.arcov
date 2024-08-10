import type { DefineSetupFnComponent, Slot, SlotsType } from "vue";
import type { QColumn } from "./column";
import type { UseTable } from "./hooks";

export const defaultPagination: (pagination: {}) => void;

interface QTablePagination {
  current: number;
  pageSize: number;
}

export type QTableRequest = (params: Record<string, unknown> & QTablePagination, filter: {}, sorter: {}) => Promise<{ data: unknown[]; total: number }>;

interface QTableProps {
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
}

interface QTableSlots {
  body?: Slot<{ key: string; record: Record<string, unknown>; value: unknown }>;
}

export const QTable: DefineSetupFnComponent<QTableProps, {}, SlotsType<QTableSlots>>;
