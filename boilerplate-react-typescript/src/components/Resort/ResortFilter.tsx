import React from "react";

function SearchFilter() {
  return (
    <div className="resort-filter">
      <div className="resort-heading">
        <h3>Khu vực</h3>
        <div className="filter-list">
          <button>Ninh bình</button>
          <button>Hòa Bình</button>
          <button>Hà Nội</button>
          <button>Đằ Nẵng</button>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
