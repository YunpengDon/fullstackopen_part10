import { View, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";

import { FormInputField } from "./SignIn";
import Text from "./Text";
import theme from "../theme";
import { ApolloError } from "@apollo/client";

const initialValues = {
  repositoryOwnerName: "",
  repositoryName: "",
  repositoryRating: "",
  repositoryReview: "",
};

const validationSchema = yup.object().shape({
  repositoryOwnerName: yup
    .string()
    .required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  repositoryRating: yup
    .number()
    .typeError("Rating should be a number")
    .integer("Rating should be an integer")
    .min(0, "Rating should between 0 and 100")
    .max(100, "Rating should between 0 and 100")
    .required("Rating is required"),
  repositoryReview: yup.string().required("Repository review is required"),
});

const CreateReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={theme.flexContainer}>
      <FormInputField
        name="repositoryOwnerName"
        placeholder="Repository owner name"
        formik={formik}
      />
      <FormInputField
        name="repositoryName"
        placeholder="Repository name"
        formik={formik}
      />
      <FormInputField
        name="repositoryRating"
        placeholder="Rating between 0 and 100"
        formik={formik}
      />
      <FormInputField
        name="repositoryReview"
        placeholder="Review"
        formik={formik}
        multiline={true}
      />
      <Pressable onPress={formik.handleSubmit} style={theme.buttonStyle}>
        <Text fontWeight="bold" style={theme.buttonText}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const {
      repositoryOwnerName: ownerName,
      repositoryName,
      repositoryRating: rating,
      repositoryReview: text,
    } = values;
    try {
      const data = await createReview({
        ownerName,
        repositoryName,
        rating,
        text,
      });
      if (data) {
        const id = data.createReview.repositoryId;

        navigate(`/repository/${id}`, { replace: true });
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
  return <CreateReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;
