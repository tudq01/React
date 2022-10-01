import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Resort.scss";
import ResortLists from "../../components/Resort/ResortLists";
import ResortFilter from "../../components/Resort/ResortFilter";
const Resort: React.FC = () => {
  const [destination, setDestination] = useState("");

  return (
    <>
      <section className="resort">
    

        <div className="container">
          <div className="resort-container">
            <ResortFilter />
            <ResortLists />
          </div>
        </div>
      </section>
    </>
  );
};

export default Resort;
