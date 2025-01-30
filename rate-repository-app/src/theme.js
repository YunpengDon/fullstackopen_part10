import { Platform } from "react-native";

const colors = {
  textPrimary: "#000000",
  textSecondary: "#586069",
  primary: "#0366d6",
  error: "#d73a4a",
};

const theme = {
  colors: colors,
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
  flexContainer: {
    display: "flex",
    backgroundColor: "#FFFFFF",
  },
  innerFlexContainer: {
    display: "flex",
    flexDirection: "row",
  },
  buttonStyle: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 5,
    margin: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
  },
  errorText: {
    color: colors.error,
    marginHorizontal: 12,
  },
};

export default theme;
