import React, { useEffect, useState, useContext } from "react";
import NextLink from "next/link";
import { ContextAPI } from "@utils/context";
import { Badge, IconButton, Link } from "@mui/material";
import { HiOutlineShoppingBag, HiOutlineLogout } from "react-icons/hi";
import { BsSuitHeart } from "react-icons/bs";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const { signOut, cart } = useContext(ContextAPI);
  const router = useRouter();
  useEffect(() => {
    const data = Cookies.get("user");
    if (data !== undefined) {
      setUser(JSON.parse(data));
      setIsLoggedIn(true);
    } else {
      setUser("");
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <nav className="nav-container">
      <img alt="logo" src="" />
      <div className="space"></div>
      <article>
        <NextLink passHref href="/">
          <Link>Home</Link>
        </NextLink>
        {!isLoggedIn ? (
          <NextLink passHref href="/authentication">
            <Link>Login | Create Account</Link>
          </NextLink>
        ) : (
          <div className="nav__profile">
            <NextLink
              passHref
              href={`${user.role === "admin" ? "/admin" : "/profile"}`}
            >
              <Link>{user.email}</Link>
            </NextLink>
            <IconButton size="small" color="primary" onClick={signOut}>
              <HiOutlineLogout />
            </IconButton>
          </div>
        )}
        <div>
          <IconButton size="small" onClick={() => router.push("/cart")}>
            <Badge badgeContent={`${cart.length}`}>
              <HiOutlineShoppingBag />
            </Badge>
          </IconButton>
          <IconButton size="small">
            <BsSuitHeart />
          </IconButton>
        </div>
      </article>
    </nav>
  );
};

export default NavBar;
