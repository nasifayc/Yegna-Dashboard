export interface ValidationError {
  type: string;
  value: string | undefined | null;
  msg: string;
  path: string;
  location: string;
}
