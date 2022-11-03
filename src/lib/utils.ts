import { IRentData } from "../types/rent";

const sortDataByYear = (unsortedData: IRentData[]) => {
  return [...unsortedData].sort((a, b) => {
    return parseInt(a.year.toString()) - parseInt(b.year.toString());
  });
};

export { sortDataByYear };
