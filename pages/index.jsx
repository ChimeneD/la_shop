import React, { useState, useEffect } from "react";
import Layout from "@components/layout";
import { PRODUCTS } from "@graphql/queries";
import { useQuery } from "@apollo/client";
import ProductCard from "@components/product-card";
export default function Home() {
  const { loading } = useQuery(PRODUCTS, {
    onCompleted: (data) => {
      setProductData(data.products);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [productData, setProductData] = useState([]);
  return (
    <Layout title="Home">
      <section className="product__container">
        {productData.length > 0
          ? productData.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  products={productData}
                />
              );
            })
          : ""}
      </section>
    </Layout>
  );
}
