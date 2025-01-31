import { gql } from "@apollo/client";
import { BASIC_REPOSITORY_INFO } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...BasicRepositoryInfo
        }
        cursor
      }
      totalCount
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${BASIC_REPOSITORY_INFO}
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository: repository(id: $repositoryId) {
      ...BasicRepositoryInfo
      url
    }
    reviews: repository(id: $repositoryId) {
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
  ${BASIC_REPOSITORY_INFO}
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
  query Me($includeReviews: Boolean = false) {
    me {
      username
      id
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            repository {
              id
              fullName
            }
            userId
            repositoryId
            rating
            createdAt
            text
          }
        }
      }
    }
  }
`;
