import { TextInput, View, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import Text from "./Text";
import theme from "../theme";

const initialValues = {
  userName: "",
  password: "",
};

const styles = StyleSheet.create({
  input: {
    // height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    borderColor: "#A9A9A9",
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
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <View style={styles.flexContainer}>
      <TextInput
        placeholder="Username"
        value={formik.values.userName}
        onChangeText={formik.handleChange("userName")}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        style={styles.input}
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
  const onSubmit = (values) => {
    console.log(values);
    
  }
  return <SignInForm onSubmit={onSubmit}/>
}

export default SignIn
