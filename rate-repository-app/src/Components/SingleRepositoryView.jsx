import { FlatList, View, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import { format } from "date-fns";

import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

import theme from "../theme";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  reviewRating: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width: 42,
    height: 42,
    borderRadius: 21,
    margin: 12,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewRatingText: {
    color: theme.colors.primary,
  },
  reviewInfo: {
    marginVertical: 12,
    marginRight: 12,
    flexShrink: 1,
  },
  reviewCreatedAtText: {
    // fontSize: 14,
    marginVertical: 6,
  },
});

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} url={true} />;
};

const ReviewItem = ({ review }) => {
  // Single review item

  return (
    <View key={review.id} style={[theme.flexContainer, { marginTop: 10 }]}>
      <View style={theme.innerFlexContainer}>
        <View style={styles.reviewRating}>
          <Text
            fontWeight="bold"
            style={styles.reviewRatingText}
            testID="reviewRating"
          >
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewInfo}>
          <Text fontWeight="bold" testID="reviewUsername">
            {review.user.username}
          </Text>
          <Text
            color="textSecondary"
            style={styles.reviewCreatedAtText}
            testID="reviewCreatedAt"
          >
            {format(new Date(review.createdAt), "MM.dd.yyyy")}
          </Text>
          <Text testID="reviewText">{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: {
      repositoryId: id,
    },
  });
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!loading && !error && data) {
    const repository = data.repository;
    const reviews = data.reviews.reviews.edges;

    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item.node} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      />
    );
  }
};

export default SingleRepository;
