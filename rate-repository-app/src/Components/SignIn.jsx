import { TextInput, View, Pressable, StyleSheet, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";
import theme from "../theme";
import { ApolloError } from "@apollo/client";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    borderColor: "#A9A9A9",
  },
  errorInput: {
    borderColor: theme.colors.error,
  },
  flexContainer: {
    display: "flex",
    backgroundColor: "#FFFFFF",
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 5,
    margin: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
  },
  errorText: {
    color: theme.colors.error,
    marginHorizontal: 12,
  },
});

export const SignInInput = ({ error, ...props }) => {
  const inputSytles = [styles.input, error && styles.errorInput];
  return <TextInput style={inputSytles} {...props} />;
};

export const FormInputField = ({ name, placeholder, formik, ...props }) => {
  return (
    <>
      <SignInInput
        placeholder={placeholder}
        value={formik.values[name]}
        onChangeText={formik.handleChange(name)}
        error={formik.touched[name] && formik.errors[name]}
        {...props}
      />
      {formik.touched[name] && formik.errors[name] && (
        <Text style={theme.errorText}>{formik.errors[name]}</Text>
      )}
    </>
  );
};

export const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.flexContainer}>
      <FormInputField placeholder="Username" name="username" formik={formik} />
      <FormInputField
        placeholder="Password"
        name="password"
        formik={formik}
        secureTextEntry
      />
      <Pressable onPress={formik.handleSubmit} style={styles.buttonStyle}>
        <Text fontWeight="bold" style={styles.buttonText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      if (data) {
        navigate("/", { replace: true });
      }
    } catch (e) {
      if (e instanceof ApolloError) {
        console.log(e.graphQLErrors[0].message);
        Alert.alert(
          e.graphQLErrors[0].message,
          "please make sure your input is correct"
        );
      } else {
        console.log(JSON.stringify(e));
      }
    }
  };
  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
