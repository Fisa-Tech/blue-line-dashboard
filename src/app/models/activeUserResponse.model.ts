export interface ActiveUsersResponse {
  totalActiveUsers: number;
  totalActions: number;
  activeUsersPerPeriod: { [key: string]: number };
}
