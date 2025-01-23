import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const sytles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    flexWrap: "wrap",
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    sytles.text,
    color === "textSecondary" && sytles.colorTextSecondary,
    color === "primary" && sytles.colorPrimary,
    fontSize === "subheading" && sytles.fontSizeSubheading,
    fontWeight === "bold" && sytles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
