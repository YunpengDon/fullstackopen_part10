import { View, Image, StyleSheet, Pressable } from "react-native";
import * as Linking from "expo-linking";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";

export const styles = StyleSheet.create({
  innerFlexContainer: {
    display: "flex",
    flexDirection: "row",
  },
  basicInfoContainer: {
    display: "flex",
    margin: 12,
    flexShrink: 1,
  },
  infoText: {
    marginBottom: 6,
  },
  interactionCountContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 12,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    margin: 12,
    borderRadius: 5,
  },
  languageTag: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    color: "#FFFFFF",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginVertical: 6,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignItems: "center",
    margin: 12,
    padding: 18,
  },
});

const InteractionCount = ({ name, count, testID }) => {
  const countDisplayString =
    Number(count) > 1000
      ? (Number(count) / 1000).toFixed(1) + "k"
      : String(count);
  return (
    <View style={{ alignItems: "center" }}>
      <Text fontWeight="bold" style={styles.infoText} testID={testID}>
        {countDisplayString}
      </Text>
      <Text color="textSecondary">{name}</Text>
    </View>
  );
};
// repository's full name, description, language, number of forks, number of stars, rating average and number of reviews.
const RepositoryItem = ({ item, url = false }) => {
  const navigate = useNavigate();
  return (
    <Pressable
      onPress={() => {
        navigate(`/repository/${item.id}`);
      }}
    >
      <View style={theme.flexContainer} testID="repositoryItem">
        <View style={theme.innerFlexContainer}>
          <Image style={styles.tinyLogo} src={item.ownerAvatarUrl} />
          <View style={styles.basicInfoContainer}>
            <Text fontWeight="bold" style={styles.infoText} testID="fullName">
              {item.fullName}
            </Text>
            <Text
              color="textSecondary"
              style={styles.infoText}
              testID="description"
            >
              {item.description}
            </Text>
            <Text style={styles.languageTag} testID="language">
              {item.language}
            </Text>
          </View>
        </View>
        <View style={styles.interactionCountContainer}>
          <InteractionCount
            name="Stars"
            count={item.stargazersCount}
            testID="stargazersCount"
          />
          <InteractionCount
            name="Forks"
            count={item.forksCount}
            testID="forksCount"
          />
          <InteractionCount
            name="Reviews"
            count={item.reviewCount}
            testID="reviewCount"
          />
          <InteractionCount
            name="Rating"
            count={item.ratingAverage}
            testID="ratingAverage"
          />
        </View>
        {url ? (
          <Pressable
            onPress={() => {  
              Linking.openURL(item.url);
            }}
          >
            <View style={styles.primaryButton}>
              <Text fontWeight="bold" style={{ color: "white" }}>
                Open in Github
              </Text>
            </View>
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
