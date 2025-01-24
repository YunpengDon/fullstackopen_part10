import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link, Navigate } from "react-router-native";
import Text from "./Text";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    // padding: 24,
    backgroundColor: "#24292e",
    flexDirection: "row",
  },
  tabHeading: {
    color: "#F0FFFF",
    fontSize: 20,
    padding: 12,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <Link to="/" underlayColor="transparent">
            <Text fontWeight="bold" style={styles.tabHeading}>
              Repositories
            </Text>
          </Link>
        </Pressable>
        <Link to="/sign-in" underlayColor="transparent">
          <Text fontWeight="bold" style={styles.tabHeading}>
            Sign in
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
