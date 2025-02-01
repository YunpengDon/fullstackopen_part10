import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const [repositories, setRepositories] = useState(null);
  // const [loading, setLoading] = useState(false);

  // const fetchRepositories = async () => {
  //   setLoading(true);

  //   // Replace the IP address part with your own IP address!
  //   const response = await fetch("http://192.168.0.109:5001/api/repositories");
  //   const json = await response.json();

  //   setLoading(false);
  //   setRepositories(json);
  // };

  // useEffect(() => {
  //   fetchRepositories();
  // }, []);

  // return { repositories, loading, refetch: fetchRepositories };

  const { data, error, loading, refetch, fetchMore } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: "cache-and-network",
      variables: variables,
    }
  );

  const hanleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  useEffect(() => {
    if (!loading && !error && data) {
      setRepositories(data.repositories);
    }
  }, [loading, error, data]);

  return { repositories, loading, error, refetch, fetchMore: hanleFetchMore };
};

export default useRepositories;
