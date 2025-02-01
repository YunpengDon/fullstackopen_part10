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

export const PAGE_INFO = gql`
  fragment PageInfoFragment on PageInfo {
    hasPreviousPage
    hasNextPage
    startCursor
    endCursor
  }
`;
