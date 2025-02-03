export interface ChallengeResponse {
  id?: number;
  name?: string;
  startDate?: number[];
  endDate?: number[];
  description?: string;
  type?: string;
  distanceGoal?: number;
  timeGoal?: number;
  streakPeriod?: number;
  streakNbOfParticipations?: number;
  [key: string]: any;
}

export interface Challenge {
  id?: number;
  name?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  type?: string;
  distanceGoal?: number;
  timeGoal?: number;
  streakPeriod?: number;
  streakNbOfParticipations?: number;
  [key: string]: any;
}
