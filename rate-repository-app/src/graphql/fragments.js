import { gql } from "@apollo/client";

export const BASIC_REPOSITORY_INFO = gql`
  fragment BasicRepositoryInfo on Repository {
    id
    name
    ownerName
    createdAt
    fullName
    reviewCount
    ratingAverage
    forksCount
    stargazersCount
    description
    language
    ownerAvatarUrl
  }
`;
