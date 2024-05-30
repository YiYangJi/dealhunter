// Importa la libreria de React y Link de react-router-dom
import React from "react";
import { Link } from "react-router-dom";

// Define y exporta el componente Footer
export default function Footer() {
  return (
    <>
      <div className="container">
        <section>
          <div className="row text-center d-flex justify-content-center pt-4">
            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link to={"/"} className="text-white">
                  Home
                </Link>
              </h6>
            </div>

            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link to={"/about"} className="text-white">
                  About
                </Link>
              </h6>
            </div>

            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link to={"/new deals"} className="text-white">
                  New Deals
                </Link>
              </h6>
            </div>

            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link to={"/best deals"} className="text-white">
                  Best deals
                </Link>
              </h6>
            </div>

            <div className="col-md-2">
              <h6 className="text-uppercase font-weight-bold">
                <Link to={"/contact"} className="text-white">
                  Contact
                </Link>
              </h6>
            </div>
          </div>
        </section>

        <hr className="my-3" />

        <section className="mb-4">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <p>
                Welcome to our community of avid gamers, where you'll discover an extensive array of video games at unbeatable prices! Dive
                into our diverse catalog, filled with timeless classics and the latest releases, and join us as we explore, save, and play
                together.
                <br />
                <br />
                Don't miss out on our exclusive deals and promotions, become part of our gaming family today!
              </p>
            </div>
          </div>
        </section>

        <section className="text-center mb-4">
          <a href="https://www.facebook.com/login/" target="_blank" rel="noreferrer" className="text-white me-4">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a href="https://discord.gg/y3XRkwsC" target="_blank" rel="noreferrer" className="text-white me-4">
            <i className="fab fa-discord fa-2x"></i>
          </a>
          <a href="https://github.com/YiYangJi" target="_blank" rel="noreferrer" className="text-white me-4">
            <i className="fab fa-github fa-2x"></i>
          </a>
        </section>
      </div>

      <hr className="my-2" />

      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        © 2024 YiYang Ji (Johnny)
      </div>
    </>
  );
}
