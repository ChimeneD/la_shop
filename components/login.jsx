import React from "react";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    setValue
  } = useForm();

  const signIn = ({ email, password }) => {
    toast.success(email);
    toast.success(password);
  };
  return (
    <form onSubmit={handleSubmit(signIn)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: true,
          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
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
          required: true
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
      <Button fullWidth variant="contained" type="submit" color="primary">
        SIGN IN
      </Button>
    </form>
  );
};

export default Login;
