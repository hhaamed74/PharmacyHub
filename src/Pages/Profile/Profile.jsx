import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Menu from "../../Components/Menu";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { updateUser } from "../../Redux/Slice/user";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./Profile.css";
const Profile = () => {
  // Selecting user information from Redux store
  const userInfo = useSelector((state) => state.user.userInfo);

  // State variables for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Function to handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Dispatching action to update user information
      await dispatch(
        updateUser({
          name,
          email,
          phoneNumber,
          street,
          city,
        })
      );

      // Showing success toast upon successful update
      toast.success("Profile updated successfully");
    } catch (error) {
      // Showing error toast if update fails
      toast.error(error[0]);
    }
  };

  return (
    <Container>
      <Row>
        {/* Sidebar menu */}
        <Col md={2}>
          <Menu />
        </Col>
        {/* Profile update form */}
        <Col md={10} className="mb-12">
          <div id="profile">
            <Form onSubmit={handleUpdate} className="profile__form">
              {/* Name field */}
              <FormGroup className="form__groups">
                <Form.Label htmlFor="name" className="pb-0">
                  Your Name*
                </Form.Label>
                <input
                  placeholder={userInfo?.name || "Name"}
                  name="name"
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormGroup>

              {/* Email field */}
              <FormGroup className="form__groups">
                <Form.Label htmlFor="email" className="pb-0">
                  Email*
                </Form.Label>
                <input
                  placeholder={userInfo?.email || "Email"}
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>

              {/* Phone number field */}
              <FormGroup className="form__groups">
                <Form.Label htmlFor="phoneNumber" className="pb-0">
                  Phone Number*
                </Form.Label>
                <input
                  placeholder={userInfo?.phoneNumber || "Phone Number"}
                  className="form-control"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </FormGroup>

              {/* Street field */}
              <FormGroup className="form__groups">
                <Form.Label htmlFor="street" className="pb-0">
                  Street*
                </Form.Label>
                <input
                  placeholder={userInfo?.street || "Street"}
                  className="form-control"
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </FormGroup>

              {/* City field */}
              <FormGroup className="form__groups">
                <Form.Label htmlFor="city" className="pb-0">
                  City*
                </Form.Label>
                <input
                  placeholder={userInfo?.city || "City"}
                  className="form-control"
                  value={city}
                  type="text"
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </FormGroup>

              {/* Save button */}
              <Button
                style={{
                  backgroundColor: "#13a03b",
                  color: "#f7f7f7",
                  border: "1px solid #13a03b",
                  padding: "10px",
                  width: "50%",
                  margin: "0 auto",
                }}
                type="submit"
              >
                Save
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
