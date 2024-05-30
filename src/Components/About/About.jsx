import React, { useEffect } from "react"; // Importa las librerías de react
import "./About.css"; // Importa el archivo de css

// Importa las librerías de react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Exporta la función About
export default function About() {
  // Utiliza useEffect para que al cargar la página, se posicione en la parte superior
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // El array vacío indica que solo se ejecutará una vez

  return (
    <>
      <div className="about__bg-presentation--overlay pt-4 d-flex align-items-center justify-content-center">
        <div className="text-white">
          <h1 className="pt-5 fw-bold mb-5 about__h1--title">About</h1>
        </div>
      </div>

      <div className="container mx-auto text-center py-5">
        <h1 className="text-white fw-bold pb-md-5 mb-5">Who are we?</h1>
        <div className="row justify-content-center align-items-center pb-md-5 mb-5">
          <div className="col-lg-5 col-md-6">
            <p className="text-white about__p-fs">
              At DealHunter, we're dedicated to bringing you the best deals on video games. Our team scours the gaming universe to find the
              latest discounts and promotions so you can enjoy your favorite games without breaking the bank.
            </p>
          </div>
          <div className="col-lg-5 col-md-5">
            <img src="/dealhunter/img/aboutPicture.png" alt="" className="img-fluid about__img1--rotate d-md-block" />
          </div>
        </div>
        <div className="row flex-row-reverse justify-content-center align-items-center">
          <div className="col-lg-5 col-md-6">
            <p className="text-white about__p-fs">
              Whether you're a hardcore gamer, casual player, DealHunter is your go-to destination for unbeatable savings on video games.
              Thank you for choosing us as your source for discounted video games. Get ready to level up your gaming experience without
              leveling up your expenses!
            </p>
          </div>
          <div className="col-lg-5 col-md-6">
            <img src="/dealhunter/img/aboutPicture2.png" alt="" className="img-fluid about__img2--rotate d-md-block" />
          </div>
        </div>

        <h1 className="text-white fw-bold pt-md-5 mt-5 pb-4">Social media</h1>
        <p className="text-white about__p-fs">
          Stay connected with DealHunter on social media for the latest updates, deals, and community discussions! Follow us on these
          platforms to be part of our growing gaming community and never miss out on the excitement!
        </p>

        <div className="row justify-content-center">
          <div className="col-lg-4 col-sm-6 mb-4">
            <a href="https://www.facebook.com/login/" target="_blank" rel="noreferrer" className="text-decoration-none">
              <div className="about__card bg-dark border-0 text-center text-white">
                <i className="fa-brands fa-facebook fa-5x fa-bounce-hover pt-3"></i>
                <div className="card-body">
                  <h4 className="card-title pb-4">Facebook</h4>
                  <p className="card-text">Follow us on Facebook for news, announcements, and exclusive promotions.</p>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6 mb-4">
            <a
              href="https://discord.com/oauth2/authorize?client_id=1220283733400092692"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none">
              <div className="about__card bg-dark border-0 text-center text-white">
                <i className="fa-brands fa-discord fa-5x fa-bounce-hover pt-3"></i>
                <div className="card-body">
                  <h4 className="card-title pb-4">Discord</h4>
                  <p className="card-text">
                    Join our Discord server to chat with fellow gamers, participate in events, and get insider information on upcoming
                    deals.
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-sm-6 mb-4">
            <a href="https://github.com/YiYangJi/dealhunter" target="_blank" rel="noreferrer" className="text-decoration-none">
              <div className="about__card bg-dark border-0 text-center text-white">
                <i className="fa-brands fa-github fa-5x fa-bounce-hover pt-3"></i>
                <div className="card-body">
                  <h4 className="card-title pb-4">GitHub</h4>
                  <p className="card-text">
                    Explore our GitHub repository to discover the latest projects and contribute to the development of DealHunter.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      {/* Contenedor de notificaciones Toast */}
      <ToastContainer position="bottom-center" autoClose={2000} closeOnClick pauseOnFocusLoss={false} draggable theme="dark" />
    </>
  );
}
