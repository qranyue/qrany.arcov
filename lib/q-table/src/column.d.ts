interface FieldTextQuery {
  default?: string;
}
interface FieldText {
  type?: "text";
  query?: FieldTextQuery;
}

interface FieldNumberQuery {
  default?: number | string;
}
interface FieldNumber {
  type?: "number";
  query?: FieldNumberQuery;
}

interface FieldDigestQuery {
  default?: [number | string, number | string];
}
interface FieldDigit {
  type?: "digit";
  query?: FieldDigestQuery;
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

interface FieldCascaderProps<k = number | string> {
  options?: [k, string, k?][];
}
interface FieldCascaderQuery<k = number | string> {
  default?: string | number | string[] | number[];
  request?: (form: Record<string, unknown>) => Promise<[k, string, k?][]>;
}
interface FieldCascader {
  type?: "cascader";
  props?: FieldCascaderProps;
  query?: FieldCascaderQuery;
}

interface FieldRangePickerQuery {}
interface FieldRangePickerQuery {
  default?: [string, string];
}
interface FieldRangePicker {
  type?: "range-picker";
  query?: FieldRangePickerQuery;
}

interface Column {
  key: string;
  title: string;
  tip?: string;
  width?: number;
  align?: "left" | "center" | "right";
  sorter?: boolean;
}

export type QColumn = Column & (FieldText | FieldNumber | FieldDigit | FieldSelect | FieldCascader | FieldRangePicker);
