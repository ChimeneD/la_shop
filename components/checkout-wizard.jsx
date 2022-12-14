import React from "react";
import { Step, StepLabel, Stepper } from "@mui/material";

const CheckoutWizard = ({ activeStep = 0 }) => {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      style={{ background: "transparent" }}
    >
      {["Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step) => {
          return (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          );
        },
      )}
    </Stepper>
  );
};

export default CheckoutWizard;
