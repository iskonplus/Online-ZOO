export type Validator = (value: string) => string;

export interface FieldConfig {
  input: HTMLInputElement;
  error: HTMLElement;
  validator: Validator;
}
