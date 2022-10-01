import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      email
      role
      token
      tokenExpiration
    }
  }
`;
export const BRANDS = gql`
  query Brands {
    brands {
      _id
      name
    }
  }
`;
export const CATEGORIES = gql`
  query Categories {
    categories {
      _id
      name
    }
  }
`;
