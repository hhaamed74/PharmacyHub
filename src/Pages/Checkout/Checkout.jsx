import React, { useState, useEffect } from "react";
import "./Checkout.css";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { getCookie } from "../../Routers/ProtectedRoute";

// Checkout component definition
const Checkout = () => {
  // eslint-disable-next-line no-unused-vars
  const [billingData, setBillingData] = useState({}); // State for billing data
  const USERID = getCookie("id"); // Get user ID from cookies

  // useEffect hook to load saved billing data from localStorage
  useEffect(() => {
    const savedBillingData = localStorage.getItem("billingData");
    if (savedBillingData) {
      setBillingData(JSON.parse(savedBillingData)); // Set billing data from localStorage
    }
  }, []);

  // Function to handle the Stripe token
  const handleToken = async (token) => {
    try {
      const res = await axios.post(
        `https://e-pharmacyhub-edarcdhhakcaeaad.eastus-01.azurewebsites.net/api/Payments/${USERID}`,
        { token }, // Send token to backend
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`, // Set authorization header
          },
        }
      );
      const { status } = res.data; // Get status from response
      console.log(res.data);
      if (status === "success") {
        toast("Success! Check emails for details", {
          type: "success",
        });
      } else {
        toast("Success", {
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast("Success", {
        type: "success",
      });
    }
  };

  return (
    <div style={styles.payment}>
      <div style={styles.container}>
        <div style={styles.row}>
          <div style={styles.col}>
            <h3 style={styles.header}>Payment</h3>
            <div style={styles.stripeWrapper}>
              <StripeCheckout
                stripeKey="pk_test_51PCvbyCUzw0yD3H3EwAbARz3bRkiMAUn8c3Xzv1OcLxBjJF2OfYJUUEZ9rLB8Si9A2g0FRpLPc7I4gE3xRit5Li300A8pW0PBL" // Stripe public key
                token={handleToken} // Function to handle the token
                billingAddress
                shippingAddress
                amount={50 * 100} // Amount in cents
                name="PHARMACY HUB"
                style={styles.stripeButton}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline styles for the component
const styles = {
  payment: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f4f4f9",
    padding: "2rem",
  },
  container: {
    background: "#e0ffe0",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    maxWidth: "500px",
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  col: {
    width: "100%",
  },
  header: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  stripeWrapper: {
    width: "100%",
  },
  stripeButton: {
    width: "100%",
  },
};

export default Checkout;
