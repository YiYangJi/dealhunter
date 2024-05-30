import React from "react";
import "./ErrorPage.css";

export default function ErrorPage() {
  return (
    <div className="mt-5 pt-4">
      <div className="errorPage__bg-error--overlay pt-5">
        <div className="container text-center text-white">
          <h1 className="text-white errorPage__error--404 fw-bold">404</h1>
          <h1 className="text-white mb-5">We couldn't find this page</h1>
          <p className="text-white fs-5 fw-medium">
            We can't seem to find the page you're looking for. <br /> Try going back to the previous page or go to our homepage. If you
            think this is a mistake, please contact us.
          </p>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
