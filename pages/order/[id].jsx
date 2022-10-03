import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@components/layout";
import NextLink from "next/link";
import {
  Card,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
  Grid,
  Button,
} from "@mui/material";
import { useLazyQuery } from "@apollo/client";
import { ORDER } from "@graphql/queries";
import Cookies from "js-cookie";

const OrderDetail = () => {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const { id } = router.query;

  const [fetchOrder, { loading }] = useLazyQuery(ORDER, {
    onCompleted: (data) => {
      setOrder(data.order);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    if (router.isReady) {
      fetchOrder({ variables: { orderId: id } });
    }
    let user = null;
    const data = Cookies.get("user");
    data !== undefined ? (user = JSON.parse(data)) : (user = null);
    user === null
      ? router.push(`/authentication?redirect=/order/${id}`)
      : !user.token && router.push(`/authentication?redirect=/order/${id}`);
  }, []);
  return (
    <Layout title={`Order: ${id}`}>
      <Typography variant="h1" component="h1">
        Order: {id}
      </Typography>
      <div>
        {order && (
          <div>
            <Card className="card">
              <List>
                <ListItem>
                  <Typography variant="h2" component="h2">
                    Shipping Address
                  </Typography>
                </ListItem>
                <ListItem>
                  {order.name}, {order.address.street}, {order.address.city},{" "}
                  {order.address.postalCode}&nbsp;
                </ListItem>
                <ListItem>
                  Delivery status:{" "}
                  {order.isDelivered
                    ? `delivered at ${order.deliveredAt}`
                    : `not delivered`}
                </ListItem>
              </List>
            </Card>
            <Card className="card">
              <List>
                <ListItem>
                  <Typography variant="h2" component="h2">
                    Payment Method
                  </Typography>
                </ListItem>
                <ListItem>{order.paymentMethod}</ListItem>
                <ListItem>
                  Payment status:{" "}
                  {order.paid ? `Paid at ${order.paidAt}` : `not paid`}
                </ListItem>
              </List>
            </Card>
            <Card className="card">
              <List>
                <ListItem>
                  <Typography variant="h2" component="h2">
                    Ordered Items
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
                        {order.items.map((item) => {
                          return (
                            <TableRow key={item._id}>
                              <TableCell>
                                <NextLink
                                  href={`/product/${item.product._id}`}
                                  passHref
                                >
                                  <Link>
                                    <img
                                      src={item.product.image}
                                      alt={item.product.name}
                                      width={50}
                                      height={50}
                                    />
                                  </Link>
                                </NextLink>
                              </TableCell>

                              <TableCell>
                                <NextLink
                                  href={`/product/${item.product._id}`}
                                  passHref
                                >
                                  <Link>
                                    <Typography>{item.product.name}</Typography>
                                  </Link>
                                </NextLink>
                              </TableCell>

                              <TableCell align="right">
                                <Typography>{item.quantity}</Typography>
                              </TableCell>

                              <TableCell align="right">
                                <Typography>R {item.product.price}</Typography>
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
          </div>
        )}
        {order && (
          <div>
            <Card className="card">
              <List>
                <ListItem>
                  <Typography variant="h2">Order Summary</Typography>
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
                        <strong> R {order.totalPrice} </strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    disabled
                  >
                    Pay On Delivery
                  </Button>
                </ListItem>
              </List>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderDetail;
