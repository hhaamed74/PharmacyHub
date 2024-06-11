import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Container, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { changePassword } from "../../Redux/Slice/user";
import Menu from "../../Components/Menu";
import "./ChangePassword.css";
const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const sign = async (e) => {
    e.preventDefault();

    // Reset error message
    setError("");

    // Check if fields are filled
    if (!currentPassword || !newPassword) {
      setError("Please fill in all fields");
      return;
    }

    // Set loading state to true
    setLoading(true);
    try {
      // Dispatch the changePassword action
      await dispatch(changePassword({ currentPassword, newPassword }));
      // Show success notification
      toast.success("Password changed successfully");
      // Reset loading state
      setLoading(false);
    } catch (error) {
      // Reset loading state
      setLoading(false);
      // Show error notification
      toast.error("Failed to change password");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={2}>
          {/* Sidebar menu */}
          <Menu />
        </Col>
        <Col md={10} className="mb-12">
          <div id="change-password">
            {/* Password change form */}
            <Form onSubmit={sign}>
              <FormGroup className="form__groups">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter Your Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__groups">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter Your New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormGroup>
              {/* Error message display */}
              {error && <p className="error-message text-red-500">{error}</p>}
              {/* Submit button */}
              <Button
                type="submit"
                className="buy_btn auth_btn"
                disabled={loading}
                style={{
                  backgroundColor: "#13a03b",
                  color: "#f7f7f7",
                  border: "1px solid #13a03b",
                  padding: "10px",
                  width: "50%",
                  margin: "0 auto",
                }}
              >
                {/* Show loading text when submitting */}
                {loading ? "Loading..." : "Change Password"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
