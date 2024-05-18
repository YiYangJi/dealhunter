import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 vh-100">
      <div className="loader-wrapper">
        <div className="packman"></div>
        <div className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
}
