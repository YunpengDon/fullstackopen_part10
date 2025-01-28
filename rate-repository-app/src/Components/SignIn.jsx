import { TextInput, View, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";
import AuthStorage from "../utils/authStorage";
import theme from "../theme";

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
    // height: 40,
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

const SignInInput = ({ error, ...props }) => {
  const inputSytles = [styles.input, error && styles.errorInput];
  return <TextInput style={inputSytles} {...props} />;
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.flexContainer}>
      <SignInInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        error={formik.touched.username && formik.errors.username}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <SignInInput
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        error={formik.touched.password && formik.errors.password}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
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
  const accessStorage = new AuthStorage()
  accessStorage.getAccessToken().then(res => console.log('inital token:', res)
  );
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      await accessStorage.setAccessToken(data)
    } catch (e) {
      console.log(e);
    }
    const newToken = await accessStorage.getAccessToken();
    console.log('final token:', newToken);
    ;
    
  };
  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
