// Importa las librerías de react
import React, { useEffect, useState } from "react";

import "./Contact.css"; // Importa los estilos CSS para este componente

// Importa las librerías de bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Importa las librerías de react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define y exporta el componente Contact
export default function Contact() {
  // Define los estados para la validación de los campos del formulario y los mensajes de error correspondientes
  const [emailValidation, setEmailValidation] = useState();
  const [emailErrorMessage, setEmailErrorMessage] = useState();

  const [nameValidation, setNameValidation] = useState();
  const [nameErrorMessage, setNameErrorMessage] = useState();

  const [messageValidation, setMessageValidation] = useState();
  const [messageErrorMessage, setMessageErrorMessage] = useState();

  // useEffect para que al cargar la página, se posicione en la parte superior de la misma
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Función asíncrona para enviar los datos del formulario
  const sendFormData = async (form) => {
    const formData = new FormData(form); // Crea un nuevo objeto FormData con los datos del formulario
    const data = Object.fromEntries(formData); // Convierte los datos del formulario en un objeto para manejarlo

    // Realiza una petición POST a la API de Formspree con los datos del formulario
    const response = await fetch("https://formspree.io/f/mqkrjqro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Si la respuesta es correcta
    if (response.ok) {
      console.log("Form successfully submitted"); // Muestra un mensaje en la consola
      form.reset(); // Resetea el formulario
      toast.success(<div className="text-center">Form successfully submitted</div>); // Muestra toast con un mensaje de éxito
    } else {
      console.log("Error submitting form, please try again later"); // Muestra un mensaje de error en la consola
      toast.error(<div className="text-center">Error submitting form, please try again later</div>); // Muestra toast con un mensaje de error
    }
  };

  // Función para validar el formulario
  const handleValidation = (event) => {
    event.preventDefault(); // Previene el envio del formulario
    const email = /^\w+\.?\w+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // Expresión regular para validar el email

    // Valida si los campos del formulario están vacíos
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
      setEmailErrorMessage("Please introduce a valid email address."); // Valida si el email es válido
    } else {
      setEmailErrorMessage("");
    }

    // Si los campos del formulario están completos y el email es válido
    if (nameValidation && emailValidation && messageValidation && emailValidation.match(email)) {
      const form = event.currentTarget; // Obtiene el formulario

      sendFormData(form); // Llama a la función sendFormData con el formulario como parámetro
    }
  };

  return (
    <>
      <div className="contact__bg-presentation--overlay pt-4 d-flex align-items-center justify-content-center">
        <div className="text-white">
          <h1 className="pt-5 fw-bold mb-5 contact__h1--title">Contact</h1>
        </div>
      </div>

      <div className="container mx-auto text-center pb-5">
        <div className="pb-4">
          <h1 className="text-white fw-bold pt-md-5 mt-3 pb-4">Contact us now!</h1>
          <p className="text-white contact__p--fs">
            Have a question about our website or services? Want to share feedback or just say hello? At DealHunter, we value your input and
            are always eager to connect with our users! Fill out the form below with your inquiry, and we'll get back to you as soon as
            possible. Thank you for considering us as your destination for all things gaming. We look forward to hearing from you and
            assisting you in any way we can!
          </p>
        </div>

        <div className="w-75 mx-auto">
          {/* Formulario con la función handleValidation para que se ejecute la funcion al darle al boton de enviar */}
          <Form noValidate onSubmit={handleValidation}>
            <Row className="g-2">
              <Col md>
                <FloatingLabel controlId="floatingInput" label="Name" className="mb-3 text-secondary" data-bs-theme="dark">
                  <Form.Control
                    type="text"
                    placeholder="Johnn Smith"
                    name="Name"
                    className="bg-dark border-secondary"
                    onChange={(e) => setNameValidation(e.target.value)} // Al cambiar el valor del input, se ejecuta la función setNameValidation
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
                    onChange={(e) => setEmailValidation(e.target.value)} // Al cambiar el valor del input, se ejecuta la función setEmailValidation
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
                  onChange={(e) => setMessageValidation(e.target.value)} // Al cambiar el valor del input, se ejecuta la función setMessageValidation
                />
                <p className="ps-2 text-danger">{messageErrorMessage}</p>
              </FloatingLabel>
            </Row>

            <button className="contact__btn--style" type="submit">
              Submit
            </button>
          </Form>
        </div>
      </div>
      {/* Contenedor de notificaciones Toast */}
      <ToastContainer position="bottom-center" autoClose={2000} closeOnClick pauseOnFocusLoss={false} draggable theme="dark" />
    </>
  );
}
