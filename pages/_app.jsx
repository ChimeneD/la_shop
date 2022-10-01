import React, { useState, useEffect } from "react";
import createEmotionCache from "@utils/createEmotionCache";
import Cookies from "js-cookie";
import AOS from "aos";

import { CacheProvider } from "@emotion/react";
import { ContextAPI } from "@utils/context";
import { loadTheme, getCurrentTheme } from "@helpers/theme";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "@styles/globals.css";
import "aos/dist/aos.css";
// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import 'swiper/css/effect-fade';

// stylesheets for different pages
import "@styles/pages/login-page.css";
import "@styles/pages/admin-page.css";
// import '@styles/css/home.css';
// import '@styles/css/shop.css';
// import '@styles/css/products.css';

// stylesheets for components
// import '@styles/css/product-card.css';
import "@styles/components/navbar.css";
// import '@styles/css/side-menu.css';
// import '@styles/css/search-bar.css';
// import '@styles/css/modal.css';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const client = new ApolloClient({
    uri: `${process.env.BACKEND_URI}`,
    cache: new InMemoryCache()
  });

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    checkUser();
    loadTheme(getCurrentTheme());
    Cookies.get("darkMode") === "ON" ? setDarkMode(true) : setDarkMode(false);
  }, []);

  //states
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const timeout = 1000;
  // function to check user login
  const checkUser = () => {
    let data = Cookies.get("user");
    data !== undefined ? setUser(JSON.parse(data)) : setUser(null);
  };
  // function to update user info
  const saveUser = (data) => {
    Cookies.set("user", JSON.stringify(data));
    setUser(data);
  };
  // function to clear user info
  const signOut = () => {
    Cookies.remove("user");
    setUser(null);
    setTimeout(function () {
      window.location.reload();
    }, timeout);
  };
  //function to toggle darkmode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    Cookies.set("darkMode", !darkMode ? "ON" : "OFF");
    loadTheme(getCurrentTheme());
  };
  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={client}>
        <ContextAPI.Provider
          value={{
            darkMode: darkMode,
            user: user,
            saveUser: saveUser,
            toggleDarkMode: toggleDarkMode,
            signOut: signOut
          }}
        >
          <Component {...pageProps} />
        </ContextAPI.Provider>
      </ApolloProvider>
    </CacheProvider>
  );
};

export default MyApp;
