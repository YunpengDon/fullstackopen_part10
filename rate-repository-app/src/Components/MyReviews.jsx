import { View, FlatList, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { format } from "date-fns";
import Text from "./Text";
import theme from "../theme";
import useMyReviews from "../hooks/useMyReviews";
import LoadingSpinner from "./LoadingSpinner";
import useDeleteReview from "../hooks/useDeleteReview";
import { ApolloError } from "@apollo/client";

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
  innerInfoButton: {
    ...theme.buttonStyle,
    flex: 1,
    marginTop: 0,
  },
  innerAltertButton: {
    ...theme.buttonStyle,
    backgroundColor: "firebrick",
    marginLeft: 0,
    marginTop: 0,
    flex: 1,
  },
});

const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();
  // Single review item

  const deleteReviewHandler = (id) => {
    console.log("delete:", id);
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          onPress: () => console.log("Cancel delete"),
        },
        {
          text: "DELETE",
          onPress: async () => {
            try {
              await deleteReview(id)
              refetch();
            } catch (e) {
              if (e instanceof ApolloError) {
                Alert.alert(e.graphQLErrors[0].message);
              } else {
                console.log("Error:",e);
              }
            }
          },
        },
      ]
    );
  };
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
      <View
        style={[theme.innerFlexContainer, { alignContent: "space-between" }]}
      >
        <Pressable
          onPress={() => navigate(`/repository/${review.repository.id}`)}
          style={styles.innerInfoButton}
        >
          <Text fontWeight="bold" style={theme.buttonText}>
            View repository
          </Text>
        </Pressable>
        <Pressable
          onPress={() => deleteReviewHandler(review.id)}
          style={styles.innerAltertButton}
        >
          <Text fontWeight="bold" style={theme.buttonText}>
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviewsContainer = ({ reviews, loading, error, refetch }) => {
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
      renderItem={({ item }) => <ReviewItem review={item.node} refetch={refetch}/>}
      keyExtractor={(item) => item.node.id.toString()}
      ListEmptyComponent={
        <ListEmptyComponent loading={loading} error={error} />
      }
      contentContainerStyle={styles.flatListContent}
    />
  );
};

const MyReviews = () => {
  const { myReviews, loading, error, refetch } = useMyReviews();
  return (
    <MyReviewsContainer
      reviews={myReviews}
      loading={loading}
      error={error}
      refetch={refetch}
    />
  );
};

export default MyReviews;
