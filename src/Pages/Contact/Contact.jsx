import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Row } from "react-bootstrap";
import "../../css/Contact.css";
import Helmet from "../../Components/Helmet/Helmet";

// Contact component definition
const Contact = () => {
    const form = useRef(); // UseRef hook to access form element

    // Function to send email using emailjs
    const sendEmail = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        emailjs
            .sendForm(
                "service_wp60rso", // Service ID
                "template_7jz2cnn", // Template ID
                form.current, // Form element
                "6XnaLBqYtVAVFaMyz" // Public key
            )
            .then(
                () => {
                    // Handle success (Optional: You can add success notification here)
                },
                (error) => {
                    // Handle error (Optional: You can add error notification here)
                    console.error("FAILED...", error.text);
                }
            );
    };

    return (
        <Helmet title="Contact us">
            {" "}
            {/* Helmet component to set the page title */}
            <div className="container">
                <Row>
                    <p className="contact-text">
                        We are happy to receive your inquiries and suggestions.
                    </p>
                </Row>
                <form
                    style={{
                        maxWidth: "50%",
                    }}
                    ref={form} // Reference to form element
                    onSubmit={sendEmail} // Form submission handler
                >
                    <Row>
                        <label htmlFor="first">First Name</label>
                        <input
                            type="text"
                            id="first"
                            name="user_name"
                            placeholder="First Name"
                        />
                    </Row>
                    <Row>
                        <label htmlFor="last">Last Name</label>
                        <input type="text" id="last" placeholder="Last Name" />
                    </Row>
                    <Row>
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="number"
                            id="phone"
                            name="user_Phone"
                            placeholder="Phone Number"
                        />
                    </Row>
                    <Row>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="user_email"
                            placeholder="Email"
                        />
                    </Row>
                    <Row>
                        <label htmlFor="comment">Comment</label>
                        <textarea id="comment" name="message"></textarea>
                    </Row>
                    <div className="form-btn">
                        <input type="submit" value="Send"></input>{" "}
                        {/* Submit button */}
                    </div>
                </form>
            </div>
        </Helmet>
    );
};

export default Contact;
