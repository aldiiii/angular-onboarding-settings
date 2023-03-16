export interface CustomField {
  fieldName: string;
  label: string;
  type: string;
  value: string;
  rules: { [key: string]: any };
}
