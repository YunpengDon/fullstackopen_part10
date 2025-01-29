import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { useApolloClient } from "@apollo/client";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";
import { ME } from "../graphql/queries";
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
  const { _loading, _error, data } = useQuery(ME);
  const authStorage = useContext(AuthStorageContext);
  const apploClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apploClient.resetStore();
  };

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
        {data && data.me ? (
          <Link
            to="/sign-in"
            underlayColor="transparent"
            onPress={handleSignOut}
          >
            <Text fontWeight="bold" style={styles.tabHeading}>
              Sign out
            </Text>
          </Link>
        ) : (
          <Link to="/sign-in" underlayColor="transparent">
            <Text fontWeight="bold" style={styles.tabHeading}>
              Sign in
            </Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
