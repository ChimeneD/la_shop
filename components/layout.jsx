import React, { useContext } from "react";
import Head from "next/head";
import NavBar from "./nav";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "@styles/theme";
import { ContextAPI } from "@utils/context";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description }) => {
  const { darkMode } = useContext(ContextAPI);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Head>
        <title>{title ? `${title} | La SHOP` : "La SHOP"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <NavBar />
      <Toaster />
      <main className="container">{children}</main>
    </ThemeProvider>
  );
};

export default Layout;
