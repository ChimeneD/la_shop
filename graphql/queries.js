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
export const PRODUCTS = gql`
  query Products {
    products {
      _id
      name
      image
      price
      slug
      description
      stock
      brand {
        _id
        name
      }
      category {
        _id
        name
      }
    }
  }
`;
export const ORDER = gql`
  query Order($orderId: String!) {
    order(id: $orderId) {
      _id
      items {
        product {
          _id
          image
          name
          slug
          price
          stock
          rating
          description
          category {
            _id
            name
          }
          brand {
            _id
            name
          }
        }
        quantity
        total
      }
      address {
        street
        city
        postalCode
      }
      user {
        _id
        email
        firstName
        lastName
      }
      name
      totalPrice
      paid
      isDelivered
      paymentMethod
    }
  }
`;
export const ORDERS = gql`
  query Orders($userId: String!) {
    orders(user: $userId) {
      _id
      items {
        product {
          _id
          image
          name
          slug
          price
          stock
          rating
          description
          category {
            _id
            name
          }
          brand {
            _id
            name
          }
        }
        quantity
        total
      }
      address {
        street
        city
        postalCode
      }
      user {
        _id
        email
        firstName
        lastName
      }
      name
      totalPrice
      paid
      isDelivered
      paymentMethod
    }
  }
`;
export const ALL_ORDERS = gql`
  query AllOrders {
    allOrders {
      _id
      items {
        product {
          _id
          image
          name
          slug
          price
          stock
          rating
          description
          category {
            _id
            name
          }
          brand {
            _id
            name
          }
        }
        quantity
        total
      }
      address {
        street
        city
        postalCode
      }
      user {
        _id
        email
        firstName
        lastName
      }
      name
      totalPrice
      paid
      isDelivered
      paymentMethod
    }
  }
`;
