import { gql } from "@apollo/client";
import { BASIC_REPOSITORY_INFO, PAGE_INFO } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      edges {
        node {
          ...BasicRepositoryInfo
        }
        cursor
      }
      pageInfo {
        ...PageInfoFragment
      }
      totalCount
    }
  }
  ${BASIC_REPOSITORY_INFO}
  ${PAGE_INFO}
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository: repository(id: $repositoryId) {
      ...BasicRepositoryInfo
      url
    }
    reviews: repository(id: $repositoryId) {
      id
      fullName
      reviews(first: $first, after: $after) {
        edges {
          node {
            user {
              id
              username
            }
            id
            createdAt
            rating
            text
          }
        }
        pageInfo {
          ...PageInfoFragment
        }
      }
    }
  }
  ${BASIC_REPOSITORY_INFO}
  ${PAGE_INFO}
`;

export const GET_REVIEW = gql`
  query Reviews($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews {
        edges {
          node {
            user {
              id
              username
            }
            id
            createdAt
            rating
            text
          }
        }
      }
    }
  }
`;

export const ME = gql`
  query Me($includeReviews: Boolean = false, $first: Int, $after: String) {
    me {
      username
      id
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        pageInfo {
          ...PageInfoFragment
        }
        edges {
          cursor
          node {
            createdAt
            id
            rating
            repository {
              id
              fullName
            }
            repositoryId
            text
          }
        }
      }
    }
  }
  ${PAGE_INFO}
`;
