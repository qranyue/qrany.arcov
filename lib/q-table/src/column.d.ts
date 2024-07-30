interface FieldTextQuery {
  default?: string;
}
interface FieldText {
  type?: "text";
  query?: FieldTextQuery;
}

interface FieldNumberQuery {
  default?: number;
}
interface FieldNumber {
  type?: "number";
  query?: FieldNumberQuery;
}

interface FieldSelectProps {
  options?: [number | string, string][];
}
interface FieldSelectQuery {
  default?: string | number | string[] | number[];
  request?: (form: Record<string, unknown>) => Promise<[number | string, string][]>;
}
interface FieldSelect {
  type?: "select";
  props?: FieldSelectProps;
  query?: FieldSelectQuery;
}

interface Column {
  key: string;
  title: string;
  tip?: string;
  width?: number;
  align?: "left" | "center" | "right";
  sorter?: boolean;
}

export type QColumn = Column & (FieldText | FieldNumber | FieldSelect);
