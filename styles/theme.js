import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

const {
  //light theme
  background_light,
  primary_light,
  secondary_light,
  success_light
  // text_one_light,
  // text_two_light,
  //dark theme
} = colors;
//Light Theme
export const lightTheme = createTheme({
  typography: {
    h1: {
      fontSize: "1.6rem",
      fontWeight: 400,
      margin: "1rem 0",
      color: primary_light,
      fontFamily: "Josefin Sans"
    },
    h2: {
      fontSize: "1.4rem",
      fontWeight: 400,
      margin: "1rem 0",
      color: primary_light,
      fontFamily: "Josefin Sans"
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: 400,
      margin: "0",
      color: primary_light,
      fontFamily: "Josefin Sans"
    },
    h4: {
      fontSize: "1.0rem",
      fontWeight: 500,
      margin: "0",
      color: primary_light,
      fontFamily: "Marcellus"
    },
    h5: {
      fontSize: "0.8rem",
      fontWeight: 400,
      margin: "0",
      color: primary_light,
      fontFamily: "Josefin Sans"
    },
    h6: {
      fontSize: "0.6rem",
      fontWeight: 400,
      margin: "0",
      color: primary_light,
      fontFamily: "Josefin Sans"
    },
    body1: {
      fontFamily: "Josefin Sans",
      color: "#757575"
    },
    body2: {
      fontFamily: "Josefin Sans",
      color: "#616161"
    },
    caption: {
      color: primary_light,
      margin: "20px",
      fontFamily: "Josefin Sans",
      fontWeight: "bold",
      fontSize: 10
    },
    button: {
      fontFamily: "Josefin Sans"
    }
  },
  palette: {
    mode: "light",
    primary: {
      main: primary_light
    },
    secondary: {
      main: secondary_light
    },
    success: {
      main: success_light
    },
    background: {
      default: background_light
    }
  }
});
//Dark Theme
export const darkTheme = createTheme({
  typography: {
    h1: {
      fontSize: "1.6rem",
      fontWeight: 400,
      margin: "1rem 0",
      color: "#b2ff59",
      fontFamily: "Josefin Sans"
    },
    h2: {
      fontSize: "1.4rem",
      fontWeight: 400,
      margin: "1rem 0",
      color: "#b2ff59",
      fontFamily: "Josefin Sans"
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: 400,
      margin: "0",
      color: "#b2ff59",
      fontFamily: "Josefin Sans"
    },
    h4: {
      fontSize: "1.0rem",
      fontWeight: 500,
      margin: "0",
      color: "#b2ff59",
      fontFamily: "Marcellus"
    },
    h5: {
      fontSize: "0.8rem",
      fontWeight: 400,
      margin: "0",
      color: "#b2ff59",
      fontFamily: "Josefin Sans"
    },
    h6: {
      fontSize: "0.6rem",
      fontWeight: 400,
      margin: "0",
      color: "#b2ff59",
      fontFamily: "Josefin Sans"
    },
    body1: {
      fontFamily: "Josefin Sans",
      color: "#f1f8e9"
    },
    body2: {
      fontFamily: "Josefin Sans",
      color: "#616161"
    },
    caption: {
      color: "#b2ff59",
      margin: "20px",
      fontFamily: "Josefin Sans",
      fontWeight: "bold",
      fontSize: 10
    },
    button: {
      fontFamily: "Josefin Sans"
    }
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#b2ff59"
    },
    secondary: {
      main: "#ffff8d"
    },
    background: {
      default: "#121212"
    }
  }
});
