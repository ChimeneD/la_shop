import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useLazyQuery } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { LOGIN_USER } from "@graphql/queries";
import { ContextAPI } from "@utils/context";
import { useRouter } from "next/router";

const Login = () => {
  const { saveUser } = useContext(ContextAPI);
  const router = useRouter();
  const { redirect } = router.query;
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      saveUser(data.loginUser);
      setValue("email", "");
      setValue("password", "");
      router.push(redirect || "/");
      return;
    },
    onError: (error) => {
      toast.error("Login Error: ", error.message);
    },
  });

  const signIn = ({ email, password }) => {
    loginUser({
      variables: { email: email, password: password },
    });
  };
  useEffect(() => {}, []);
  return (
    <form onSubmit={handleSubmit(signIn)}>
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
            id="email"
            label="Email"
            fullWidth
            error={Boolean(errors.email)}
            helperText={
              errors.email?.type === "required"
                ? "Email is required"
                : errors.email?.type === "pattern"
                ? "Email is invalid"
                : "e.g: example@gmail.com"
            }
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            error={Boolean(errors.password)}
            helperText={
              errors.password ? "Password is required" : "example@3323"
            }
            {...field}
          />
        )}
      />
      <Button
        fullWidth
        variant="contained"
        type="submit"
        color="primary"
        disabled={loading}
      >
        SIGN IN
      </Button>
    </form>
  );
};

export default Login;
