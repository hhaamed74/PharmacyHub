import React, { useState } from "react";
import Helmet from "../../Components/Helmet/Helmet";
import { Row, Col, Form, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../Redux/Slice/user";
import { toast } from "react-toastify";
import "../../css/LogIn.css";

// LogIn Component: Renders the login form and handles user login functionality
const LogIn = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [loading, setLoading] = useState(false); // State for loading state
  const navigate = useNavigate(); // Navigate hook for navigation
  const dispatch = useDispatch(); // Redux dispatch function
  // eslint-disable-next-line no-unused-vars
  const userInfo = useSelector((state) => state.user.userInfo); // User info from Redux store

  // Function to handle user login
  const signIn = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state to true
    try {
      // Dispatch login action with email and password
      await dispatch(logIn({ email, password }));

      // Display success toast
      toast.success("Logged in successfully");

      // Redirect to home page after successful login
      navigate("/home");
    } catch (error) {
      setLoading(false); // Set loading state to false
      // Show error message if login fails
      toast.error("Failed to login");
    }
  };

  return (
    <Helmet title="LogIn">
      {" "}
      {/* Helmet component to set the page title */}
      <div className="container">
        <Row style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Col lg="12" className="text-center">
            {loading ? (
              <h5 className="fw-bold">Loading.....</h5> // Show loading message if loading
            ) : (
              <Col lg="6" className="m-auto text-center">
                <Form className="auth__form" onSubmit={signIn}>
                  <h3 className="fw-bold">Login</h3>
                  {/* Email input */}
                  <FormGroup className="form__groups">
                    <input
                      style={{
                        marginBottom: "10px",
                        width: "100%",
                        paddingLeft: "20px",
                      }}
                      type="email"
                      autoComplete="email"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Update email state on change
                    />
                  </FormGroup>
                  {/* Password input */}
                  <FormGroup className="form__groups">
                    <input
                      style={{
                        marginBottom: "10px",
                        width: "100%",
                        paddingLeft: "20px",
                      }}
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // Update password state on change
                    />
                  </FormGroup>
                  {/* Submit button */}
                  <button type="submit" className="buy_btn auth_btn">
                    Login
                  </button>
                  {/* Link to sign up page */}
                  <p>
                    Don't have an account?{" "}
                    <Link to="/signUp">Create an account</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Col>
        </Row>
      </div>
    </Helmet>
  );
};

export default LogIn;
