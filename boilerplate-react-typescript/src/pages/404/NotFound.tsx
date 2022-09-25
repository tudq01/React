import React from "react";
import "./NotFound.scss";

function NotFound() {
  return (
    <section className="not-found">
      <div className="NF-container">
        <div className="NF-icon">
          <span id="NF-icon">404</span>
        </div>
        <div className="NF-content">
          <h2 className="NF-heading"> Oops! That page can’t be found.</h2>
          <p>
            It looks like nothing was found at this location. Maybe try one of
            the links below or a search?
          </p>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
