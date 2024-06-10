import React, { useState } from "react";
import { Row, Col, Form, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../Redux/Slice/user"; // Importing Redux action
import { useDispatch } from "react-redux"; // Importing useDispatch hook

const SignUp = () => {
  // State variables for form fields and loading status
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRetypePassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Navigate function for programmatic navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const sign = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Dispatching action to register user
      await dispatch(
        register({
          name,
          email,
          phoneNumber,
          street,
          city,
          password,
          repeatPassword,
        })
      );

      // Showing success toast upon successful registration
      toast.success("Signed up successfully");
      // Redirecting to login page after successful registration
      navigate("/login");
    } catch (error) {
      setLoading(false);
      // Showing error toast if registration fails
      toast.error(error[0]);
      // Redirecting back to sign up page in case of error
      navigate("/signUp");
    }
  };

  return (
    <div className="container">
      <Row style={{ marginLeft: "auto", marginRight: "auto" }}>
        {/* Checking loading status */}
        {loading ? (
          <Col lg="12" className="text-center">
            <h5 className="fw-bold">Loading.....</h5>
          </Col>
        ) : (
          <Col lg="6" className="m-auto text-center">
            {/* Sign up form */}
            <Form className="auth__form" onSubmit={sign}>
              <h3 className="fw-bold">Register</h3>
              {/* Name field */}
              <FormGroup className="form__groups">
                <input
                  name="name"
                  className="form-control"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              {/* Email field */}
              <FormGroup className="form__groups">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              {/* Phone number field */}
              <FormGroup className="form__groups">
                <input
                  className="form-control"
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormGroup>
              {/* Street field */}
              <FormGroup className="form__groups">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </FormGroup>
              {/* City field */}
              <FormGroup className="form__groups">
                <input
                  className="form-control"
                  value={city}
                  type="text"
                  name="city"
                  placeholder="Enter city name"
                  autoComplete="username" // Add autoComplete attribute
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormGroup>
              {/* Password field */}
              <FormGroup className="form__groups">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // autoComplete="new-password" // Add autoComplete attribute
                />
              </FormGroup>
              {/* Repeat password field */}
              <FormGroup className="form__groups">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Retype Your Password"
                  value={repeatPassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  // autoComplete="new-password" // Add autoComplete attribute
                />
              </FormGroup>
              {/* Submit button */}
              <button
                type="submit"
                className="buy_btn auth_btn"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
              {/* Link to login page */}
              <p>
                Already have an account? <Link to={"/login"}>Login</Link>
              </p>
            </Form>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default SignUp;
