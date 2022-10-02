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
  $user: String!
) {
  createOrder(
    user: $user
  ){
    _id
  }
}
`;
