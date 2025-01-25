import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#000000",
    textSecondary: "#586069",
    primary: "#0366d6",
    error: "#d73a4a",
  },
  fontSizes: {
    body: 16,
    subheading: 24,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
