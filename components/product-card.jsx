import React, { useContext, useState, useEffect } from "react";
import { IconButton, Typography, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { ContextAPI } from "@utils/context";
import { MdAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";

const ProductCard = ({ product, products }) => {
  const { addToCart, cart, removeFromCart } = useContext(ContextAPI);
  const router = useRouter();
  const { name, image, price, slug } = product;

  const [productInCart, setProductInCart] = useState(false);
  useEffect(() => {
    let findProduct = cart.find((item) => item.slug === slug);
    if (findProduct !== undefined) {
      setProductInCart(true);
    } else {
      setProductInCart(false);
    }
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
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>{name}</Typography>
        <Typography>R {price}</Typography>
      </div>
      {!productInCart ? (
        <Tooltip title="Add To Cart">
          <IconButton
            color="primary"
            fullWidth
            onClick={() => addToCart(slug, products)}
            style={{ position: "absolute", right: "1px", bottom: "10px" }}
          >
            <MdAddShoppingCart />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Remove From Cart">
          <IconButton
            color="secondary"
            fullWidth
            onClick={() => removeFromCart(slug, products)}
            style={{ position: "absolute", right: "1px", bottom: "10px" }}
          >
            <MdOutlineRemoveShoppingCart />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default ProductCard;
