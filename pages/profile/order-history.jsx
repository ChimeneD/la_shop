import Layout from "@components/layout";
import {
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { TiInfoLarge } from "react-icons/ti";
import Cookies from "js-cookie";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import { ORDERS } from "@graphql/queries";

const OrderHistory = () => {
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [fetchOrders, { loading }] = useLazyQuery(ORDERS, {
    onCompleted: (data) => {
      setOrders(data.orders);
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  useEffect(() => {
    let user = null;
    const data = Cookies.get("user");
    data !== undefined ? (user = JSON.parse(data)) : (user = null);
    if (user === null) {
      return router.push("/authentication?redirect=/order-history");
    }
    !user.token && router.push("/authentication?redirect=/order-history");

    fetchOrders({ variables: { userId: user._id } });
  }, []);

  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {}, []);
  const submitUpdate = () => {};
  return (
    <Layout title="Order History">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className="card">
            <List>
              <NextLink href="/profile" passHref>
                <ListItem button component="a">
                  <ListItemText primary="User Profile" />
                </ListItem>
              </NextLink>
              <NextLink href="/profile/order-history" passHref>
                <ListItem button component="a" selected>
                  <ListItemText primary="Order History" />
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>

        <Grid item md={9} xs={12}>
          <Card className="card">
            <List>
              <ListItem>
                <Typography variant="h1" component="h1">
                  Order History
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
                                <NextLink href={`/order/${order._id}`} passHref>
                                  <Tooltip title="View Details">
                                    <IconButton
                                      variant="contained"
                                      color="primary"
                                    >
                                      <TiInfoLarge />
                                    </IconButton>
                                  </Tooltip>
                                </NextLink>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default OrderHistory;
