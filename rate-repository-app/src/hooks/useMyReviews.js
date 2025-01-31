import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const useMyReviews = () => {
  const [myReviews, setMyReviews] = useState([]);

  const { data, error, loading, refetch } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      setMyReviews(data.me.reviews.edges);
    }
  }, [loading, error, data]);

  return { myReviews, loading, error, refetch };
};

export default useMyReviews;
