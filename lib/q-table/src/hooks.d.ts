export interface UseTable {
  form: Record<string, unknown>;
  selectedRowKeys: string[] | number[];
  selectedRows: unknown[];

  query: (form: Record<string, unknown>) => Promise<{ data: unknown[]; total: number }>;
  reload: () => Promise<{ data: unknown[]; total: number }>;
}

export const useTable: () => UseTable;
