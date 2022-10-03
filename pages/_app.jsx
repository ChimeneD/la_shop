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
import "@styles/pages/home-page.css";
// import '@styles/css/shop.css';
// import '@styles/css/products.css';

// stylesheets for components
import "@styles/components/product-card.css";
import "@styles/components/navbar.css";
import toast from "react-hot-toast";
// import '@styles/css/side-menu.css';
// import '@styles/css/search-bar.css';
// import '@styles/css/modal.css';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const client = new ApolloClient({
    // Provide required constructor fields
    cache: new InMemoryCache(),
    uri: `${process.env.BACKEND_URI}`,
    fetchOptions: {
      mode: "no-cors",
      // credentials: "include",
    },
  });

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    checkUser();
    initializeCart();
    initializeAddress();
    initializePayment();
    initializeQuantity();
    loadTheme(getCurrentTheme());
    Cookies.get("darkMode") === "ON" ? setDarkMode(true) : setDarkMode(false);
  }, []);

  //states
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({});
  const [payment, setPayment] = useState("");
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);
  const timeout = 1000;

  // eslint-disable-next-line
  Array.prototype.sum = function (prop) {
    let total = 0;
    for (let i = 0, _len = this.length; i < _len; i++) {
      total += this[i][prop];
    }
    return total;
  };
  //Function to Remove and Element from Array
  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }
  // function to initialize cart
  const initializeCart = () => {
    const cartData = Cookies.get("cart");
    if (cartData !== undefined) {
      setCart(JSON.parse(cartData));
    }
  };
  // function to initialize cart
  const initializeAddress = () => {
    const addressData = Cookies.get("address");
    if (addressData !== undefined) {
      setAddress(JSON.parse(addressData));
    }
  };
  // function to initialize cart
  const initializePayment = () => {
    const paymentData = Cookies.get("paymentMethod");
    if (paymentData !== undefined) {
      setPayment(paymentData);
    }
  };
  // function to initialize total and quantity
  const initializeQuantity = () => {
    const qty = Cookies.get("quantity");
    const total = Cookies.get("total");
    if (qty !== undefined && total !== undefined) {
      setItemCount(qty);
      setTotal(total);
    }
  };
  // function to add items to cart
  const addToCart = (slug, products) => {
    const data = products.find((product) => product.slug === slug);
    if (data) {
      const newCart = [...cart, { ...data, qty: 1, total: data.price }];
      setCart(newCart);
      console.log(newCart);
      Cookies.set("cart", JSON.stringify(newCart));
      Cookies.set("quantity", newCart.sum("qty"));
      Cookies.set("total", newCart.sum("total"));
      setItemCount(newCart.sum("qty"));
      setTotal(newCart.sum("total"));
    }
  };
  const removeFromCart = (slug) => {
    const product = cart.find((item) => item.slug === slug);
    //get the product from the cart and remove it
    const tempCart = [...cart];
    const cartIndex = tempCart.indexOf(product);

    const removeProduct = tempCart[cartIndex];
    const newCart = arrayRemove(tempCart, removeProduct);

    Cookies.set("cart", JSON.stringify(newCart));
    Cookies.set("quantity", newCart.sum("qty"));
    Cookies.set("total", newCart.sum("total"));
    setCart(newCart);
    setItemCount(newCart.sum("qty"));
    setTotal(newCart.sum("total"));
  };
  const clearCart = () => {
    setCart([]); //clear cart items
    Cookies.remove("cart");
    Cookies.remove("total");
    Cookies.remove("qty");
    setItemCount(0);
    setTotal(0);
  };
  const clearAddress = () => {
    setAddress(null);
    setPayment("");
    Cookies.remove("address");
    Cookies.remove("paymentMethod");
  };
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
  // function to update quantity
  const updateQuantity = (slug, quantity) => {
    const product = cart.find((item) => item.slug === slug);
    const tempCart = [...cart];
    const cartIndex = tempCart.indexOf(product);

    if (cartIndex !== -1) {
      const product = tempCart[cartIndex];
      product.qty = quantity;
      product.total = product.qty * product.price;
      const newCart = [...cart];
      Cookies.set("cart", JSON.stringify(newCart));
      Cookies.set("quantity", newCart.sum("qty"));
      Cookies.set("total", newCart.sum("total"));
      setCart(newCart);
      setItemCount(newCart.sum("qty"));
      setTotal(newCart.sum("total"));
    }
  };
  // function to save address
  const saveAddress = (data) => {
    setAddress(data);
    Cookies.set("address", JSON.stringify(data));
  };
  // function to save payment
  const savePayment = (data) => {
    setPayment(data);
    Cookies.set("paymentMethod", JSON.stringify(data));
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
            signOut: signOut,
            addToCart: addToCart,
            cart: cart,
            itemCount: itemCount,
            total: total,
            clearCart: clearCart,
            address: address,
            saveAddress: saveAddress,
            payment: payment,
            savePayment: savePayment,
            removeFromCart: removeFromCart,
            updateQuantity: updateQuantity,
            clearAddress: clearAddress,
          }}
        >
          <Component {...pageProps} />
        </ContextAPI.Provider>
      </ApolloProvider>
    </CacheProvider>
  );
};

export default MyApp;
