import React, { useEffect, useState, useContext } from "react";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import { ContextAPI } from "@utils/context";
import Cookies from "js-cookie";
import NextLink from "next/link";
import { List, ListItem, ListItemText } from "@mui/material";
const Orders = () => {
  // const { user } = useContext(ContextAPI);

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
  return (
    <Layout title="Orders">
      <main className="admin__container">
        <section>
          <div>
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
          </div>
          <div></div>
        </section>
      </main>
    </Layout>
  );
};

export default Orders;
