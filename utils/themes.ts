interface Theme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
}

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: "#2959aa",
    background: "#e6e7ed",
    card: "#d8d9e4",
    text: "#40434f",
    border: "#c8cada",
    notification: "#8c4351",
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: "#7aa2f7",
    background: "#1b1c27",
    card: "#232434",
    text: "rgb(255, 255, 255)",
    border: "#2b2d40",
    notification: "#8c4351",
  },
};
