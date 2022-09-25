import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Resort.scss";
import { Breadcrumb } from "antd";
import ResortLists from "../../components/Resort/ResortLists";
import ResortFilter from "../../components/Resort/ResortFilter";
const Resort: React.FC = () => {
  const [destination, setDestination] = useState("");

  return (
    <>
      <section className="resort">
        <Breadcrumb separator=">>">
          <Breadcrumb.Item>
            {" "}
            <Link to="/">Trang chủ </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {" "}
            <Link to="/resort">Khu nghỉ dưỡng</Link>
          </Breadcrumb.Item>
        </Breadcrumb>

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
