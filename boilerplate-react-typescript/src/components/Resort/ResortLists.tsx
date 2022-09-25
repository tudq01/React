import React from "react";
import ResortItem from "./ResortItem";
import "./ResortList.scss"
function ResortLists() {
  return (
    <div className="resort-list">
      <div className="resort-heading">
        <h3>Tất cả khu nghỉ dưỡng</h3>
      </div>
      <div className="all-resort">
        <ResortItem name="RollingHill" />
        <ResortItem name="RollingHill" />
        <ResortItem name="RollingHill" />
        <ResortItem name="RollingHill" />
      </div>
    </div>
  );
}

export default ResortLists;
