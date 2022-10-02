import React, { useContext, useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ContextAPI } from "@utils/context";

const ProductCard = ({ product, products }) => {
  const { addToCart, cart, removeFromCart } = useContext(ContextAPI);
  const router = useRouter();
  const { name, image, price, slug } = product;

  const [productInCart, setProductInCart] = useState(false);
  useEffect(() => {
    let findProduct = cart.find((item) => item.slug === slug);
    console.log("product => ", findProduct);
    if (findProduct !== undefined) {
      setProductInCart(true);
    } else {
      setProductInCart(false);
    }
    console.log("in cart => ", productInCart);
    //eslint-disable-next-line
  }, [productInCart, cart]);
  return (
    <div className="card__container">
      <section
        className="card__image"
        onClick={() => router.push(`/product/${slug}`)}
      >
        <img src={image} alt={name} />
      </section>
      <Typography>{name}</Typography>
      <Typography>R {price}</Typography>
      {!productInCart ? (
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => addToCart(slug, products)}
        >
          Add to Cart
        </Button>
      ) : (
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          onClick={() => removeFromCart(slug, products)}
        >
          Remove from Cart
        </Button>
      )}
    </div>
  );
};

export default ProductCard;
