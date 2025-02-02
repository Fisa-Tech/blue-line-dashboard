export interface Material {
  id?: string;
  serial?: string;
  brand?: string;
  model?: string;
  type?: string;
  price?: number;
  groupId?: string;
  commandId?: string;
  [key: string]: any;
}
