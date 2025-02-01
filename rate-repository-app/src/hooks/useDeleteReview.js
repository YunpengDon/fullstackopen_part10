import { useMutation, useApolloClient } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const apploClient = useApolloClient();

  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (deleteReviewId) => {
    try {
      const { data } = await mutate({
        variables: {
          deleteReviewId: deleteReviewId
        },
      });
      await apploClient.resetStore();
      return data;
    } catch (error) {
      console.error('Delete error:', error);
      throw error
    }
  };

  return [deleteReview, result];
};

export default useDeleteReview;