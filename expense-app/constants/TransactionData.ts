export const opacities: number[] = [1, 1, 0.6, 0.3, 0.1];
export const sizeText: number[] = [20, 15, 10];

export const data: string[] = [
  "Last year",
  "Last 6 months",
  "Last month",
  "Last week",
  "Yesterday",
  "Today",
  "All time",
];

export const getDate = (index: number): string => {
  switch (index) {
    case 0:
      return "year";
    case 1:
      return "half";
    case 2:
      return "month";
    case 3:
      return "week";
    case 4:
      return "yesterday";
    case 5:
      return "today";
    case 6:
      return "all";
    default:
      return "all";
  }
};
