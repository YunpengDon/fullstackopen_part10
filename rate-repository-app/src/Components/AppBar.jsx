import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    padding: 24,
    backgroundColor: "#24292e",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text
          fontSize="subheading"
          fontWeight="bold"
          style={{ color: "#F0FFFF" }}
        >
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
