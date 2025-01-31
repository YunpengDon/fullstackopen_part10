import { View, FlatList, StyleSheet } from "react-native";
import { format } from "date-fns";
import Text from "./Text";
import theme from "../theme";
import useMyReviews from "../hooks/useMyReviews";
import LoadingSpinner from "./LoadingSpinner";

const styles = StyleSheet.create({
  flatListContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    backgroundColor: "white",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

const ReviewItem = ({ review }) => {
  // Single review item

  return (
    <View style={[theme.flexContainer, { marginTop: 10 }]}>
      <View style={theme.innerFlexContainer}>
        <View style={theme.review.reviewRating}>
          <Text
            fontWeight="bold"
            style={theme.review.reviewRatingText}
            testID="reviewRating"
          >
            {review.rating}
          </Text>
        </View>
        <View style={theme.review.reviewInfo}>
          <Text fontWeight="bold" testID="repositoryFullName">
            {review.repository.fullName}
          </Text>
          <Text
            color="textSecondary"
            style={theme.review.reviewCreatedAtText}
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

const MyReviewsContainer = ({ reviews, loading, error }) => {
  const ListEmptyComponent = ({ loading, error }) => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <Text>Error: {error}</Text>;
    }

    return (
      <View style={styles.emptyContainer}>
        <Text fontSize="subheading">You don't have review yet</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id.toString()}
      ListEmptyComponent={
        <ListEmptyComponent loading={loading} error={error} />
      }
      contentContainerStyle={styles.flatListContent}
    />
  );
};

const MyReviews = () => {
  const { myReviews, loading, error } = useMyReviews();
  return (
    <MyReviewsContainer reviews={myReviews} loading={loading} error={error} />
  );
};

export default MyReviews;
