export interface MyEventResponse {
  id?: number;
  name?: string;
  startDate?: number[];
  endDate?: number[];
  description?: string;
  location?: string;
  [key: string]: any;
}

export interface MyEvent {
  id?: number;
  name?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  location?: string;
  [key: string]: any;
}
