import { View, Pressable, Alert } from "react-native";

import { useFormik } from "formik";
import * as yup from "yup";

import theme from "../theme";
import Text from "./Text";

import { useNavigate } from "react-router-native";
import { FormInputField } from "./SignIn";
import useSignIn from "../hooks/useSignIn";
import useCreateUser from "../hooks/useCreateUser";
import { ApolloError } from "@apollo/client";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmed: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be at most 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .max(30, "Password must be at most 30 characters")
    .required("Password is required"),
  passwordConfirmed: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Password confirmation is required"),
});

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={theme.flexContainer}>
      <FormInputField placeholder="Username" name="username" formik={formik} />
      <FormInputField
        placeholder="Password"
        name="password"
        formik={formik}
        secureTextEntry
      />
      <FormInputField
        placeholder="Password confirmation"
        name="passwordConfirmed"
        formik={formik}
        secureTextEntry
      />
      <Pressable onPress={formik.handleSubmit} style={theme.buttonStyle}>
        <Text fontWeight="bold" style={theme.buttonText}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [singUp] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const data = await singUp({ username, password });
      if (data) {
        await signIn({ username, password });
        navigate("/", { replace: true });
      }
    } catch (e) {
      if (e instanceof ApolloError) {
        console.log(e.graphQLErrors[0].message);
        Alert.alert(e.graphQLErrors[0].message);
      } else {
        console.log(JSON.stringify(e));
      }
    }
  };
  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
