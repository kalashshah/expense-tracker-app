export const bezierExpConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#ff5f6d",
  backgroundGradientTo: "#ffc371",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#f7bb97",
  },
};

export const bezierIncConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#36d1dc",
  backgroundGradientTo: "#5b86e5",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "lightgrey",
  },
};

export const lineInConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#02aab0",
  backgroundGradientTo: "#a8e063",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 20,
  },
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "lightgrey",
  },
};

export const progressConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#4568dc",
  backgroundGradientTo: "#b06ab3",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: { borderRadius: 20 },
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "lightgrey",
  },
};

export const barIncConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#00cdac",
  backgroundGradientTo: "#02aab0",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: { borderRadius: 20 },
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "lightgrey",
  },
};

export const barExpConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#7b4397",
  backgroundGradientTo: "#dc2430",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: { borderRadius: 20 },
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "lightgrey",
  },
};

export const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
