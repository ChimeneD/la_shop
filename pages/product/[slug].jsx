import React, { useEffect, useState, useContext } from "react";
import Layout from "@components/layout";
import NextLink from "next/link";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  Rating,
  Typography,
} from "@mui/material";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PRODUCT, PRODUCTS } from "@graphql/queries";
import { useRouter } from "next/router";
import { IoArrowBack } from "react-icons/io5";
import { ContextAPI } from "@utils/context";

const ProductDetail = () => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const [inCart, setInCart] = useState(false);
  const { slug } = router.query;
  const { addToCart, removeFromCart, cart } = useContext(ContextAPI);

  const [getProduct, { loading }] = useLazyQuery(GET_PRODUCT, {
    onCompleted: (data) => {
      setProduct(data.getProduct);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { loading: loadProducts } = useQuery(PRODUCTS, {
    onCompleted: (data) => {
      setProducts(data.products);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    if (router.isReady) {
      getProduct({
        variables: { slug: slug },
      });
      let findProduct = cart.find((item) => item.slug === slug);
      if (findProduct !== undefined) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    }
  }, [cart, inCart]);
  return (
    <Layout title="Product Detail">
      <Card className="card">
        <section className="">
          <NextLink href="/" passHref>
            <Link>
              <IconButton>
                <IoArrowBack color="primary" />
              </IconButton>
            </Link>
          </NextLink>
        </section>
        {product ? (
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <section
                style={{
                  position: "relative",
                  height: "400px",
                  width: "100%",
                  padding: "40px",
                }}
              >
                <section
                  style={{
                    width: "80%",
                    height: "80%",
                    border: "2px solid whitesmoke",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    width="50%"
                    height="auto"
                  />
                </section>
              </section>
            </Grid>
            <Grid item md={3} xs={12}>
              <List>
                <ListItem>
                  <Typography className="" variant="h2">
                    {product.name}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography className="">
                    Category: {product.category.name}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography className="">
                    Brand: {product.brand.name}
                  </Typography>
                </ListItem>
                {/* <ListItem>
                  <Rating value={product.rating} readOnly precision={0.1} />
                  <Typography className="" style={{ margin: "auto 5px" }}>
                    ( {product.rating.toFixed(1)} stars )
                  </Typography>
                </ListItem> */}
                <ListItem>
                  <Typography className="">
                    Description: {product.description}
                  </Typography>
                </ListItem>

                {/* <ListItem>
                  <Button fullWidth variant="outlined" onClick={handleReview}>
                    Write a review
                  </Button>
                </ListItem> */}
              </List>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Grid item xs={6}>
                      <Typography className="">Price:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="">R {product.price}</Typography>
                    </Grid>
                  </ListItem>

                  <ListItem>
                    <Grid item xs={6}>
                      <Typography className="">Status:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="">In stock</Typography>
                    </Grid>
                  </ListItem>

                  <ListItem>
                    <Grid item xs={12}>
                      {inCart ? (
                        <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          onClick={() => removeFromCart(product.slug)}
                        >
                          Remove from cart
                        </Button>
                      ) : (
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={() => addToCart(product.slug, products)}
                        >
                          Add to cart
                        </Button>
                      )}
                    </Grid>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
      </Card>
    </Layout>
  );
};

export default ProductDetail;
