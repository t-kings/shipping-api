export interface SeasonAndPriceSurge {
  startDate: EventDate;
  endDate: EventDate;
  surge: number;
  eventName: string;
}

export interface EventDate {
  month: number;
  day: number;
}
