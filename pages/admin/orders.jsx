import React, { useEffect, useState, useContext } from "react";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import { ContextAPI } from "@utils/context";
import Cookies from "js-cookie";
import NextLink from "next/link";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import { MdOutlineEdit } from "react-icons/md";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_ORDERS } from "@graphql/queries";
import { UPDATE_ORDER } from "@graphql/mutations";
import toast from "react-hot-toast";
const Orders = () => {
  const { timeout } = useContext(ContextAPI);
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const { loading } = useQuery(ALL_ORDERS, {
    onCompleted: (data) => {
      setOrders(data.allOrders);
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  const [updateOrder, { loading: updateLoading }] = useMutation(UPDATE_ORDER, {
    onCompleted: () => {
      toast.success("Order Updated");
      setTimeout(() => {
        window.location.reload();
      }, timeout);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const router = useRouter();
  useEffect(() => {
    let user = null;
    const data = Cookies.get("user");
    data !== undefined ? (user = JSON.parse(data)) : (user = null);
    user === null
      ? router.push("/authentication?redirect=/admin")
      : !user.token &&
        !user.role === "admin" &&
        router.push("/authentication?redirect=/admin");
  }, []);

  const selectOrder = (id) => {
    const data = orders.find((item) => item._id === id);
    setOrder(data);
  };

  const markPaid = (id) => {
    updateOrder({
      variables: { updateOrderId: id, paid: true, delivered: order.delivered },
    });
  };
  const markDelivered = (id) => {
    updateOrder({
      variables: { updateOrderId: id, delivered: true, paid: order.paid },
    });
  };
  return (
    <Layout title="Orders">
      <main className="admin__container">
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <List>
              <NextLink href="/admin" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Manage Products" />
                </ListItem>
              </NextLink>
              <NextLink href="/admin/orders" passHref>
                <ListItem button component="a" selected>
                  <ListItemText primary="View Orders" />
                </ListItem>
              </NextLink>
            </List>
          </Grid>
          <Grid item md={9} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h1" component="h1">
                    View Orders
                  </Typography>
                </ListItem>
                <ListItem>
                  {loading ? (
                    <section
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <CircularProgress />
                    </section>
                  ) : error ? (
                    <Typography className="error">{error}</Typography>
                  ) : orders.length === 0 ? (
                    ""
                  ) : (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>TOTAL</TableCell>
                            <TableCell>PAID</TableCell>
                            <TableCell>DELIVERED</TableCell>
                            <TableCell>ACTION</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orders.map((order) => {
                            return (
                              <TableRow key={order._id}>
                                <TableCell>
                                  {order._id.substring(20, 24)}
                                </TableCell>
                                <TableCell>R {order.totalPrice}</TableCell>
                                <TableCell>
                                  {order.paid ? `paid` : "not paid"}
                                </TableCell>
                                <TableCell>
                                  {order.isDelivered
                                    ? `delivered`
                                    : "not delivered"}
                                </TableCell>
                                <TableCell>
                                  <Tooltip title="Edit Order">
                                    <IconButton
                                      variant="contained"
                                      color="primary"
                                      onClick={() => selectOrder(order._id)}
                                    >
                                      <MdOutlineEdit />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </ListItem>

                <ListItem>
                  <section style={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="h1" component="h1">
                      Edit Order
                    </Typography>
                    {order ? (
                      <div>
                        <List style={{ width: "100%" }}>
                          <ListItem>
                            <Typography variant="h2">Order Summary</Typography>
                          </ListItem>
                          <ListItem>
                            <Grid container style={{ width: "100%" }}>
                              <Grid item xs={6}>
                                <Typography variant="h3">Owner:</Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="h3" align="right">
                                  {order.name}
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
                                  <strong> R {order.totalPrice} </strong>
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItem>
                          {order.paid && order.isDelivered ? (
                            <Button disabled variant="contained" fullWidth>
                              Order Delivered
                            </Button>
                          ) : !order.paid ? (
                            <Button
                              variant="contained"
                              fullWidth
                              onClick={() => markPaid(order._id)}
                              disabled={updateLoading}
                            >
                              Mark as paid
                            </Button>
                          ) : !order.isDelivered ? (
                            <Button
                              variant="contained"
                              color="primary"
                              fullWidth
                              onClick={() => markDelivered(order._id)}
                              disabled={updateLoading}
                            >
                              Mark as Delivered
                            </Button>
                          ) : (
                            ""
                          )}
                        </List>
                      </div>
                    ) : (
                      ""
                    )}
                  </section>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
};

export default Orders;
