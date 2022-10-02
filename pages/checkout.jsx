import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import CheckoutWizard from "@components/checkout-wizard";
import Layout from "@components/layout";
import { Button, List, ListItem, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ContextAPI } from "@utils/context";
import { useRouter } from "next/router";

const Checkout = () => {
  const { saveAddress } = useContext(ContextAPI);
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    let user = null;
    const data = Cookies.get("user");
    data !== undefined ? (user = JSON.parse(data)) : (user = null);
    user === null
      ? router.push("/authentication?redirect=/checkout")
      : !user.token && router.push("/authentication?redirect=/checkout");

    let address = null;
    const addressData = Cookies.get("address");
    addressData !== undefined
      ? (address = JSON.parse(addressData))
      : (address = null);
    if (address !== null) {
      setValue("name", address.name);
      setValue("city", address.city);
      setValue("address", address.address);
      setValue("postalCode", address.postalCode);
    }
  }, []);

  const submitAddress = ({ name, address, city, postalCode }) => {
    let data = {
      name: name,
      address: address,
      city: city,
      postalCode: postalCode,
    };
    saveAddress(data);
    Cookies.set("address", JSON.stringify(data));
    router.push("/payment");
  };
  return (
    <Layout title="Address and Shipping Details">
      <CheckoutWizard activeStep={1} />
      <form className="form" onSubmit={handleSubmit(submitAddress)}>
        <Typography variant="h1" component="h1">
          Address and Shipping Details
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  id="name"
                  label="Full Name"
                  type="text"
                  fullWidth
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name?.type === "required"
                      ? errors.name?.type === "minLength"
                        ? "Full name should be more than 1 character"
                        : "Full name is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  id="address"
                  label="Address"
                  type="text"
                  fullWidth
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address?.type === "required"
                      ? errors.address?.type === "minLength"
                        ? "Address should be more than 1 character"
                        : "Address is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  id="city"
                  label="City"
                  type="text"
                  fullWidth
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city?.type === "required"
                      ? errors.city?.type === "minLength"
                        ? "City should be more than 1 character"
                        : "City is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  id="postalCode"
                  label="Postal Code"
                  type="text"
                  fullWidth
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode?.type === "required"
                      ? errors.postalCode?.type === "minLength"
                        ? "Postal Code should be more than 1 character"
                        : "Postal Code is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Checkout;
