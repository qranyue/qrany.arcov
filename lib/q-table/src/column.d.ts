interface FieldText {
  type?: "text";
  default?: string;
}

interface FieldNumber {
  type?: "number";
  default?: number | "";
}

interface FieldDigit<K = number | ""> {
  type?: "digit";
  default?: [K, K];
}

interface FieldSelect {
  type?: "select";
  default?: string | number | string[] | number[];
}

interface FieldCascader {
  type?: "cascader";
  default?: string | number | string[] | number[];
}

interface FieldRangePicker {
  type?: "range-picker";
  default?: [string, string];
}

interface FieldImage {
  type?: "image";
}

interface FieldImages {
  type?: "images";
}

interface Column<k = string | number> {
  key: string;
  title: string;
  tip?: string;
  width?: number;
  minWidth?: number;
  ellipsis?: number;
  align?: "left" | "center" | "right";
  fixed?: "center" | "right";
  options?: [k, string, k?][];
  request?: (form: Record<string, unknown>) => Promise<[k, string, k?][]>;
  sorter?: boolean;
}

export type QColumn = Column & (FieldText | FieldNumber | FieldDigit | FieldSelect | FieldCascader | FieldRangePicker | FieldImage | FieldImages);
