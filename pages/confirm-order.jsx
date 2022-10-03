import React, { useEffect, useState, useContext } from "react";
import Layout from "@components/layout";
import CheckoutWizard from "@components/checkout-wizard";
import NextLink from "next/link";
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ContextAPI } from "@utils/context";
import { useMutation } from "@apollo/client";
import { PLACE_ORDER } from "@graphql/mutations";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const ConfirmOrder = () => {
  const router = useRouter();
  const {
    address,
    payment,
    cart,
    total,
    itemCount,
    clearCart,
    clearAddress,
    timeout,
  } = useContext(ContextAPI);
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const shippingPrice = total > 200 ? 0 : 250;
  const taxPrice = round2(total * 0.15);
  const totalPrice = round2(parseFloat(total) + shippingPrice + taxPrice);
  const stepBack = () => {
    router.push("/payment");
  };
  const [createOrder, { loading }] = useMutation(PLACE_ORDER, {
    onCompleted: (data) => {
      toast.success("Order Confirmed!");
      clearCart();
      clearAddress();
      setTimeout(() => {
        router.push(`/order/${data.createOrder._id}`);
      }, timeout);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleOrder = () => {
    const data = Cookies.get("user");
    let items = [];
    cart.map((item) => {
      let theItems = {
        product: item._id,
        quantity: item.qty,
        total: item.total,
      };
      items.push(theItems);
    });

    if (data !== undefined) {
      const user = JSON.parse(data);
      console.log(items);
      createOrder({
        variables: {
          user: user._id,
          totalPrice: totalPrice,
          address: {
            street: address.address,
            city: address.city,
            postalCode: address.postalCode,
          },
          name: address.name,
          paymentMethod: payment,
          item: items.length > 0 && items,
        },
      });
    }
  };
  useEffect(() => {
    let user = null;
    const data = Cookies.get("user");
    data !== undefined ? (user = JSON.parse(data)) : (user = null);
    user === null
      ? router.push("/authentication?redirect=/confirm-order")
      : !user.token && router.push("/authentication?redirect=/confirm-order");
  }, []);
  return (
    <Layout title="Confirm Order">
      <CheckoutWizard activeStep={3} />
      <Typography variant="h1" component="h1">
        Place Order
      </Typography>
      <div>
        <div>
          <Card className="card">
            <List>
              <ListItem>
                <Typography variant="h2" component="h2">
                  Shipping Address
                </Typography>
              </ListItem>
              {address && (
                <ListItem>
                  {address.name}, {address.address}, {address.city},{" "}
                  {address.postalCode}.{" "}
                </ListItem>
              )}
            </List>
          </Card>
          <Card className="card">
            <List>
              <ListItem>
                <Typography variant="h2" component="h2">
                  Payment Method
                </Typography>
              </ListItem>
              <ListItem>{payment}</ListItem>
            </List>
          </Card>
          <Card className="card">
            <List>
              <ListItem>
                <Typography variant="h2" component="h2">
                  Order Items
                </Typography>
              </ListItem>

              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart.map((item) => {
                        return (
                          <TableRow key={item._id}>
                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                  />
                                </Link>
                              </NextLink>
                            </TableCell>

                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Typography>{item.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>

                            <TableCell align="right">
                              <Typography>{item.qty}</Typography>
                            </TableCell>

                            <TableCell align="right">
                              <Typography>R {item.price}</Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
          <List>
            <ListItem>
              <Button fullWidth variant="outlined" onClick={stepBack}>
                Back
              </Button>
            </ListItem>
          </List>
        </div>
        <div>
          <Card className="card">
            <List>
              <ListItem>
                <Typography variant="h2">Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h3">Items:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h3" align="right">
                      {itemCount}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h3">Tax:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h3" align="right">
                      R {taxPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h3">Shipping:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h3" align="right">
                      R {shippingPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h3">
                      <strong>Total:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h3" align="right">
                      <strong> R {totalPrice} </strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={() => handleOrder()}
                  disabled={loading}
                >
                  Place Order
                </Button>
              </ListItem>
              {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmOrder;
