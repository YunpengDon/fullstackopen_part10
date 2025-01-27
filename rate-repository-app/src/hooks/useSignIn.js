import { AUTHENTICATE } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    // const credentials = { username, password }
    return await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });
  };

  return [signIn, result];
};

export default useSignIn;
