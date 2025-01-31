import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  const apploClient = useApolloClient();

  const [mutate, result] = useMutation(CREATE_USER);

  const useCreateUser = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        user: {
          username,
          password,
        },
      },
    });
    await apploClient.resetStore();
    return data;
  };

  return [useCreateUser, result];
};

export default useCreateUser;
