import React, { useState, useEffect, useContext } from "react";
import CheckoutWizard from "@components/checkout-wizard";
import Layout from "@components/layout";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { ContextAPI } from "@utils/context";

const Payment = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const { savePayment } = useContext(ContextAPI);
  useEffect(() => {
    let user = null;
    const data = Cookies.get("user");
    data !== undefined ? (user = JSON.parse(data)) : (user = null);
    user === null
      ? router.push("/authentication?redirect=/payment")
      : !user.token && router.push("/authentication?redirect=/payment");
    setPaymentMethod(Cookies.get("paymentMethod") || "");
  }, []);

  const handleChange = (value) => {
    setPaymentMethod(value);
    Cookies.set("paymentMethod", value);
  };
  const stepBack = () => {
    router.push("/checkout");
  };
  const stepForward = (e) => {
    e.preventDefault();
    if (paymentMethod) {
      savePayment(paymentMethod);
      router.push("/confirm-order");
    } else {
      toast.error("Please select payment method");
    }
  };
  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form onSubmit={stepForward} className="form">
        <Typography variant="h1" component="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => handleChange(e.target.value)}
              >
                <FormControlLabel
                  label="Cash on delivery"
                  value="Cash"
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth color="primary" variant="contained" type="submit">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button fullWidth variant="outlined" onClick={stepBack}>
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Payment;
