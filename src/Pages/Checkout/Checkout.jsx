import React, { useState, useEffect } from "react";
import "./Checkout.css";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { getCookie } from "../../Routers/ProtectedRoute";

const Checkout = () => {
  const [billingData, setBillingData] = useState({});
  useEffect(() => {
    const savedBillingData = localStorage.getItem("billingData");
    if (savedBillingData) {
      setBillingData(JSON.parse(savedBillingData));
    }
  }, []);
  const USERID = getCookie("id");

  const handleToken = async () => {
    try {
      const res = await axios.post(
        `https://e-pharmacy.runasp.net/api/Payments/${USERID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      const { status } = res.data;
      console.log(res.data);
      if (status === "success") {
        toast("Success ! Check emails for details", {
          type: "success",
        });
      } else {
        toast("Success ! Check emails for details", {
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast("Something went wrong", {
        type: "failure",
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
                stripeKey="pk_test_51PCvbyCUzw0yD3H3EwAbARz3bRkiMAUn8c3Xzv1OcLxBjJF2OfYJUUEZ9rLB8Si9A2g0FRpLPc7I4gE3xRit5Li300A8pW0PBL"
                token={handleToken}
                billingAddress
                shippingAddress
                amount={50 * 100}
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
