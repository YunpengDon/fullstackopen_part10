import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";

import Text from "./Text";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} url={true} />;
};

const SingleRepositoryView = () => {
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
    return <RepositoryInfo repository={repository} />;
  }
};

export default SingleRepositoryView;
