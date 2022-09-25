import React, { useState } from "react";
import { NamedTupleMember } from "typescript";

import { MdOutlinePlace, MdPeopleOutline } from "react-icons/md";

interface Options {
  [key: string]: number;
  adult: number;
  children: number;
}

function SearchBar() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState<Options>({ adult: 1, children: 0 });

  const handleOption = (name: string, operation: string) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  return (
    <div className="search-bar">
      <div className="search-input">
        <MdOutlinePlace />
        <input type="text" placeholder="Bạn muốn đến đâu?" />
      </div>
      <div className="search-option">
        <MdPeopleOutline />
        <span
          onClick={() => setOpenOptions(!openOptions)}
          className="option"
        >{`${options.adult} adult · ${options.children} children `}</span>
        {openOptions && (
          <div className="options">
            <div className="optionItem">
              <span className="optionText">Adult</span>
              <div className="optionCounter">
                <button
                  disabled={options.adult <= 1}
                  className="optionCounterButton"
                  onClick={() => handleOption("adult", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.adult}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("adult", "i")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Children</span>
              <div className="optionCounter">
                <button
                  disabled={options.children <= 0}
                  className="optionCounterButton"
                  onClick={() => handleOption("children", "d")}
                >
                  -
                </button>
                <span className="optionCounterNumber">{options.children}</span>
                <button
                  className="optionCounterButton"
                  onClick={() => handleOption("children", "i")}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="search-button">
        <button>Tim kiem</button>
      </div>
    </div>
  );
}

export default SearchBar;
