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
// // //stylesheets for different pages
// import '@styles/css/swiper-style.css';
// import '@styles/css/main.css';
// // import '@styles/css/login.css';
// import '@styles/css/home.css';
// import '@styles/css/shop.css';
// import '@styles/css/products.css';
// // //stylesheets for components
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
    loadTheme(getCurrentTheme());
    Cookies.get("darkMode") === "ON" ? setDarkMode(true) : setDarkMode(false);
  }, []);

  //states
  const [darkMode, setDarkMode] = useState(false);
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
            toggleDarkMode: toggleDarkMode
          }}
        >
          <Component {...pageProps} />
        </ContextAPI.Provider>
      </ApolloProvider>
    </CacheProvider>
  );
};

export default MyApp;
