export interface Order {
  id?: string,
  clientName?: string,
  activeName?: string,
  date?: string,
  totalPrice?: number,
  materialIds?: string[],
  clientId?: string,
  activeId?: string
}
