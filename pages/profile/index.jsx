import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Layout from "@components/layout";
import NextLink from "next/link";
import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
const Profile = () => {
  useEffect(() => {
    let user = null;
    const data = Cookies.get("user");
    data !== undefined ? (user = JSON.parse(data)) : (user = null);
    user === null
      ? router.push("/authentication?redirect=/profile")
      : !user.token && router.push("/authentication?redirect=/profile");
  }, []);

  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const submitUpdate = () => {};
  return (
    <Layout title="Profile">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className="card">
            <List>
              <NextLink href="/profile" passHref>
                <ListItem button component="a" selected>
                  <ListItemText primary="User Profile" />
                </ListItem>
              </NextLink>
              <NextLink href="/profile/order-history" passHref>
                <ListItem button component="a">
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
                  My Account
                </Typography>
              </ListItem>
              <ListItem>
                <form className="form" onSubmit={handleSubmit(submitUpdate)}>
                  <List>
                    <ListItem>
                      <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          minLength: 1,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            id="name"
                            label="Full name"
                            type="text"
                            fullWidth
                            error={Boolean(errors.name)}
                            helperText={
                              errors.name
                                ? errors.name.type === "minLength"
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
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            error={Boolean(errors.email)}
                            helperText={
                              errors.email
                                ? errors.email.type === "pattern"
                                  ? "Email is not valid"
                                  : "Email is required"
                                : ""
                            }
                            {...field}
                          />
                        )}
                      ></Controller>
                    </ListItem>

                    <ListItem>
                      <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                          validate: (value) =>
                            value === "" ||
                            value.length > 5 ||
                            "Password should be more than 5 characters",
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            error={Boolean(errors.password)}
                            helperText={
                              errors.confirmPassword
                                ? "Confirm password should be more than 5 characters"
                                : ""
                            }
                            {...field}
                          />
                        )}
                      />
                    </ListItem>

                    <ListItem>
                      <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        rules={{
                          validate: (value) =>
                            value === "" ||
                            value.length > 5 ||
                            "Password should be more than 5 characters",
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            error={Boolean(errors.confirmPassword)}
                            helperText={
                              errors.confirmPassword
                                ? "Password should be more than 5 characters"
                                : ""
                            }
                            {...field}
                          />
                        )}
                      />
                    </ListItem>

                    <ListItem>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Update Profile
                      </Button>
                    </ListItem>
                  </List>
                </form>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Profile;
