import { gql } from "@apollo/client";

export const ADD_BRAND = gql`
  mutation AddBrand($name: String!) {
    addBrand(name: $name) {
      _id
      name
    }
  }
`;
export const ADD_CATEGORY = gql`
  mutation AddCategory($name: String!) {
    addCategory(name: $name) {
      _id
      name
    }
  }
`;
export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!,
    $slug: String!,
    $image: String!,
    $imageID: String!,
    $price: Float!,
    $stock: Int!,
    $description: String!,
    $brand: String!,
    $category: String!,
    $feature: Boolean,
    $featureImage: String,
    $featureImageID: String,
  ) {
    addProduct(
      name: $name,
      slug: $slug,
      image: $image,
      imageID: $imageID,
      price: $price,
      stock: $stock,
      description: $description,
      brand: $brand,
      category: $category,
      feature: $feature,
      featureImage: $featureImage,
      featureImageID: $featureImageID
    ) {
      _id
      name
      slug
    }
  }
`;
export const PLACE_ORDER = gql`
  mutation CreateOrder(
    $address: AddressInput!
    $item: [ItemInput!]!
    $name: String!
    $paymentMethod: String!
    $totalPrice: Float!
    $user: String!
  ) {
    createOrder(
      address: $address
      item: $item
      name: $name
      paymentMethod: $paymentMethod
      totalPrice: $totalPrice
      user: $user
    ) {
      _id
      items {
        product {
          _id
        }
      }
    }
  }
`;
export const CREATE_ACCOUNT = gql`
  mutation CreateAccount(
      $email: String!
      $firstName: String!
      $lastName: String!
      $role: String
      $password: String!
  ){
    createAccount(
      email: $email
      firstName: $firstName
      lastName: $lastName
      role: $role
      password: $password
    ){
      _id
      email
    }
  }
`;