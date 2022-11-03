export interface IRentData {
  id: string;
  year: number;
  effectiveRent: number;
  startingRent: number;
}

// IRentData without id
export type IRentDataWithoutId = Omit<IRentData, "id">;
