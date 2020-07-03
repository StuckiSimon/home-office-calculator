export const getCalcAsPercentage = (normal, optimal, diff) => {
  return {
    normal: 100,
    optimal: getAsPercentage(normal, optimal),
    diff: getAsPercentage(normal, diff),
  };
};
export const getAsPercentage = (hundred, asked) => {
  return Math.round((100 / hundred) * asked);
};
