import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CREATE_ACCOUNT } from "@graphql/mutations";
import { ContextAPI } from "@utils/context";
import { useRouter } from "next/router";

const Register = () => {
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
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT, {
    onCompleted: (data) => {
      setValue("email", "");
      setValue("lastName", "");
      setValue("firstName", "");
      setValue("password", "");
      toast.success("Account Created");
      return;
    },
    onError: (error) => {
      toast.error("Register Error: ", error);
    },
  });

  const signUp = ({ email, password, firstName, lastName }) => {
    createAccount({
      variables: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      },
    });
  };
  useEffect(() => {}, []);
  return (
    <form onSubmit={handleSubmit(signUp)}>
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
      <div>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <TextField
              id="firstName"
              label="First name"
              fullWidth
              error={Boolean(errors.firstName)}
              helperText={
                errors.firstName ? "First name is required" : "e.g. Julia"
              }
              {...field}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <TextField
              id="lastName"
              label="Last name"
              type="lastName"
              fullWidth
              error={Boolean(errors.lastName)}
              helperText={
                errors.lastName ? "Last name is required" : "e.g. Roberts"
              }
              {...field}
            />
          )}
        />
      </div>
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
              errors.password ? "Password is required" : "e.g. example@3323"
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
        CREATE ACCOUNT
      </Button>
    </form>
  );
};

export default Register;
