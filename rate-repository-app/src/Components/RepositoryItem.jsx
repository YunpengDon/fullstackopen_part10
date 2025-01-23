import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
  },
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
    padding: 5,
    marginVertical: 6,
  },
});

const InteractionCount = ({ name, count }) => {
  const countDisplayString =
    Number(count) > 1000
      ? (Number(count) / 1000).toFixed(1) + "k"
      : String(count);
  return (
    <View style={{ alignItems: "center" }}>
      <Text fontWeight="bold" style={styles.infoText}>{countDisplayString}</Text>
      <Text color="textSecondary">{name}</Text>
    </View>
  );
};
// repository's full name, description, language, number of forks, number of stars, rating average and number of reviews.
const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.innerFlexContainer}>
        <Image style={styles.tinyLogo} src={item.ownerAvatarUrl} />
        <View style={styles.basicInfoContainer}>
          <Text fontWeight="bold" style={styles.infoText}>
            {item.fullName}
          </Text>
          <Text color="textSecondary" style={styles.infoText}>
            {item.description}
          </Text>
          <Text style={styles.languageTag}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.interactionCountContainer}>
        <InteractionCount name="Stars" count={item.stargazersCount} />
        <InteractionCount name="Forks" count={item.forksCount} />
        <InteractionCount name="Reviews" count={item.reviewCount} />
        <InteractionCount name="Rating" count={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
