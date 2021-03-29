import classnames from "classnames";
import debounce from "lodash/debounce";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";

export default function SearchBar(props) {
  const {
    className,
    debounceTimeout,
    onClear = () => {},
    onSearch = () => {},
    placeholder,
    ...others
  } = props;

  const [value, setValue] = useState("");
  const [active, setActive] = useState(false);
  const classes = classnames(className, "relative");

  const debouncedOnChange = useCallback(
    debounce(val => {
      if (val === "") {
        onClear();
      } else if (val !== "") {
        onSearch(val);
      }
    }, debounceTimeout),
    [debounceTimeout, onClear, onSearch]
  );

  const handleChange = e => {
    setValue(e.target.value);
    setActive(e.target.value.length > 0);
    debouncedOnChange(e.target.value);
  };

  useEffect(() => debouncedOnChange.cancel(), [debouncedOnChange]);

  const handleClick = e => {
    e.preventDefault();
    onSearch(value);
  };

  const onKeyDownHandler = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(value);
    }
  };

  const handleClear = e => {
    if (e) {
      e.preventDefault();
    }
    onClear();
    setValue("");
    setActive(false);
  };

  const onClearKeyDownHandler = ({ key }) => {
    if (key === "Enter" || key === " ") {
      handleClear();
    }
  };

  return (
    <form
      className={classnames("relative w-full", classes)}
      role="search"
      {...others}
    >
      <style jsx>
        {`
          input::placeholder {
            color: #6b7280;
          }
        `}
      </style>
      <input
        aria-label="search"
        className="relative w-full py-3 pl-3 h-full rounded-lg bg-gray-200"
        onChange={handleChange}
        onKeyDown={onKeyDownHandler}
        placeholder={placeholder}
        value={value}
        type="search"
      />
      {/* <button
        className={classnames("flex justify-center absolute h-full", {
          hidden: !active,
        })}
        onClick={handleClear}
        onKeyDown={onClearKeyDownHandler}
        style={{ top: "0px", right: "40px", width: "48px" }}
        aria-label="Clear"
      >
        <svg className="h-full" width="15" height="15">
          <use href="#clear" />
        </svg>
      </button> */}
      <button
        className={classnames("absolute h-full rounded-r", {
          "bg-yellow": active
        })}
        onClick={handleClick}
        onKeyDown={onKeyDownHandler}
        style={{ top: "0", right: "0", width: "40px" }}
        type="submit"
        aria-label="Submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="25"
          className="text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  className: PropTypes.string,
  debounceTimeout: PropTypes.number,
  onClear: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

SearchBar.defaultProps = {
  debounceTimeout: 300,
  placeholder: "Search…",
  className: ""
};
