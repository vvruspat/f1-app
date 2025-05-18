export type Winner = {
  year: string;
  driver: string;
  points: number;
  team: string;
  nationality: string;
};

export type RaceWinner = Omit<Winner, "year"> & {
  round: string;
  date: string;
  raceTitle: string;
  country: string;
  circuit: string;
  nationality: string;

  time: string;
  speed: string;
};
