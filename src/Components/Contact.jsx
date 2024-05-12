import React, { useState } from "react";
import "./Contact.css";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function Contact() {
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [emailValidation, setEmailValidation] = useState();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    setValidated(true);

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const email = form.elements.Email.value;
      const regex = /^\w+\.?\w+@[-A-Za-z0-9.]+\.[A-Za-z]{2,}$/;
      if (!regex.test(email)) {
        setEmailValidation("Please introduce a valid email address.");
        return;
      }

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
        setValidated(false);
      } else {
        console.log("Error al enviar el formulario");
      }
    }
  };

  return (
    <>
      <div className="contact__bg-presentation-overlay pt-4 d-flex align-items-center justify-content-center">
        <div className="text-white">
          <h1 className="pt-5 fw-bold mb-5 about__h1--title">About</h1>
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
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="g-2">
              <Col md>
                <FloatingLabel controlId="floatingInput" label="Name" className="mb-3 text-secondary" data-bs-theme="dark">
                  <Form.Control type="text" placeholder="Johnn Smith" name="Name" className="bg-dark border-secondary" required />
                  <Form.Control.Feedback type="invalid">Please introduce a name.</Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3 text-secondary" data-bs-theme="dark">
                  <Form.Control type="email" placeholder="name@example.com" name="Email" className="bg-dark border-secondary" required />
                  <Form.Control.Feedback type="invalid">{emailValidation}</Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <FloatingLabel controlId="floatingTextarea2" label="Message" data-bs-theme="dark" className="text-secondary mb-3">
                <Form.Control as="textarea" placeholder="Leave a message here" name="Message" style={{ height: "150px" }} required />
                <Form.Control.Feedback type="invalid">Please introduce a message.</Form.Control.Feedback>
              </FloatingLabel>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {formSubmitted && <p className="text-white mt-3">Formulario enviado con éxito</p>}
        </div>
      </div>
    </>
  );
}
