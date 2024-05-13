import React, { useState } from "react";
import "./Contact.css";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function Contact() {
  const [emailValidation, setEmailValidation] = useState();
  const [emailErrorMessage, setEmailErrorMessage] = useState();

  const [nameValidation, setNameValidation] = useState();
  const [nameErrorMessage, setNameErrorMessage] = useState();

  const [messageValidation, setMessageValidation] = useState();
  const [messageErrorMessage, setMessageErrorMessage] = useState();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleValidation = async (event) => {
    event.preventDefault();
    const email = /^\w+\.?\w+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!nameValidation) {
      setNameErrorMessage("Please introduce a name.");
    } else {
      setNameErrorMessage("");
    }

    if (!messageValidation) {
      setMessageErrorMessage("Please introduce a message.");
    } else {
      setMessageErrorMessage("");
    }

    if (!emailValidation) {
      setEmailErrorMessage("Please introduce an email address.");
    } else if (!emailValidation.match(email)) {
      setEmailErrorMessage("Please introduce a valid email address.");
    } else {
      setEmailErrorMessage("");
    }

    const form = event.currentTarget;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const response = await fetch("https://formspree.io/f/mqkrjqro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Formulario enviado con éxito");
      form.reset();
      setFormSubmitted(true);
    } else {
      console.log("Error al enviar el formulario");
      setFormSubmitted(false);
    }
  };

  return (
    <>
      <div className="contact__bg-presentation-overlay pt-4 d-flex align-items-center justify-content-center">
        <div className="text-white">
          <h1 className="pt-5 fw-bold mb-5 contact__h1--title">Contact</h1>
        </div>
      </div>

      <div className="container mx-auto text-center pb-5">
        <div className="pb-4">
          <h1 className="text-white fw-bold pt-md-5 mt-3 pb-4">Contact us now!</h1>
          <p className="text-white contact__p-fs">
            Have a question about our website or services? Want to share feedback or just say hello? At DealHunter, we value your input and
            are always eager to connect with our users! Fill out the form below with your inquiry, and we'll get back to you as soon as
            possible. Thank you for considering us as your destination for all things gaming. We look forward to hearing from you and
            assisting you in any way we can!
          </p>
        </div>

        <div className="w-75 mx-auto">
          <Form noValidate onSubmit={handleValidation}>
            <Row className="g-2">
              <Col md>
                <FloatingLabel controlId="floatingInput" label="Name" className="mb-3 text-secondary" data-bs-theme="dark">
                  <Form.Control
                    type="text"
                    placeholder="Johnn Smith"
                    name="Name"
                    className="bg-dark border-secondary"
                    onChange={(e) => setNameValidation(e.target.value)}
                  />
                  <p className="ps-2 text-danger">{nameErrorMessage}</p>
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3 text-secondary" data-bs-theme="dark">
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    name="Email"
                    className="bg-dark border-secondary"
                    onChange={(e) => setEmailValidation(e.target.value)}
                  />
                  <p className="ps-2 text-danger">{emailErrorMessage}</p>
                </FloatingLabel>
              </Col>

              <FloatingLabel controlId="floatingTextarea2" label="Message" data-bs-theme="dark" className="text-secondary mb-3">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a message here"
                  name="Message"
                  style={{ height: "150px" }}
                  onChange={(e) => setMessageValidation(e.target.value)}
                />
                <p className="ps-2 text-danger">{messageErrorMessage}</p>
              </FloatingLabel>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {formSubmitted && <p className="text-white mt-3">Form submitted successfully</p>}
          {!formSubmitted && <p className="text-white mt-3">Error submitting the form, please try again later</p>}
        </div>
      </div>
    </>
  );
}
