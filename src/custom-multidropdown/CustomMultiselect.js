import React, { useState, useRef, useEffect } from "react";
import "./customMultiselect.css";

import TickIcon from "./assets/tic.svg";
import DownIcon from "./assets/caret-down.svg";
import UpIcon from "./assets/caret-up.svg";

const options = [
  { value: "ocean1", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" }
];

export default function CustomMultiselect(props) {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState([]);

  /**
   * for outside click
   */
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (open != null && ref.current && !ref.current.contains(e.target)) {
        setOpen(null);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [open]);

  const handleSelect = (e) => {
    let existIndex = selectedMenu.findIndex((f) => f.label === e.label);
    if (existIndex >= 0) {
      setSelectedMenu((prev) => prev.filter((f) => f.label !== e.label));
    } else {
      setSelectedMenu([...selectedMenu, e]);
    }
  };

  const handleInputChage = (e) => setSearchValue(e.target.value);

  return (
    <div ref={ref} className="cms-container">
      <div
        style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}
      >
        {selectedMenu.map((m, i) => {
          if (i === 0)
            return <div className="cms-selected-text">{m.label}</div>;
          if (selectedMenu.length - 1 === i)
            return (
              <div className="cms-selected-text">
                {`${selectedMenu.length - 2}+ more`}
              </div>
            );
          else return null;
        })}
        <input
          className="cms-input"
          onChange={handleInputChage}
          value={searchValue}
          onClick={() => setOpen(true)}
          style={{
            MozAppearance: "none",
            WebkitAppearance: "none",
            paddingLeft: "0px"
          }}
          autocomplete="off"
        />
      </div>

      <img src={open ? UpIcon : DownIcon} alt="" className="cms-downicon" />
      {open && options.length > 0 && (
        <div className="cms-Menu">
          {options
            .filter((e) => {
              let val = true;
              if (searchValue.trim() === "") val = val && e;
              else {
                val =
                  val &&
                  e.label
                    .toLowerCase()
                    .includes(searchValue.trim().toLocaleLowerCase());
              }
              return val;
            })
            .map((m, i) => {
              let existIndex =
                selectedMenu.findIndex((f) => f.label === m.label) >= 0;
              return (
                <div
                  onClick={() => handleSelect(m)}
                  className={`${
                    existIndex ? "option-div-active" : ""
                  } option-div`}
                >
                  <p key={i} className="">
                    {m.label}
                  </p>
                  {existIndex && <img src={TickIcon} alt="" />}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
