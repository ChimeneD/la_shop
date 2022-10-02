import React, { useContext, useState, useEffect } from "react";
import NextLink from "next/link";
import Layout from "@components/layout";
import {
  IconButton,
  Typography,
  Link,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Card,
  List,
  ListItem,
  Button,
} from "@mui/material";
import { ContextAPI } from "@utils/context";
import { useRouter } from "next/router";
import { MdDeleteOutline } from "react-icons/md";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, itemCount, total } =
    useContext(ContextAPI);
  const router = useRouter();
  return (
    <Layout title="Shopping Cart">
      <Typography>Shopping Cart!!!</Typography>
      {cart.length === 0 ? (
        <div
          style={{
            margin: "10px auto",
            height: "45vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Cart is empty {"=> "}
          <NextLink href="/" passHref>
            <Link>Go shopping!!!</Link>
          </NextLink>
        </div>
      ) : (
        <div>
          <div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
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
                          <Select
                            value={item.qty}
                            onChange={(e) =>
                              updateQuantity(item.slug, e.target.value)
                            }
                          >
                            {[...Array(item.stock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>

                        <TableCell align="right">
                          <Typography>R {item.price}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => removeFromCart(item.slug)}>
                            <MdDeleteOutline color="secondary" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">
                    Subtotal ({itemCount} items): {` `}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="h3">R {total}</Typography>
                </ListItem>
                <ListItem>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    onClick={() => router.push("/checkout")}
                  >
                    Check Out
                  </Button>
                </ListItem>
              </List>
            </Card>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Cart;
