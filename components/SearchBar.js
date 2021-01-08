import Autocomplete from "react-autocomplete";
import { useState } from "react";

export default function SearchBar() {
  const [citySearchValue, setCitySearchValue] = useState("");
  console.log(citySearchValue);

  return (
    <>
      <div className="pt-4 px-5 relative w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="30"
          className="text-gray-500 absolute"
          style={{ top: "37px", left: "35px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <Autocomplete
          getItemValue={(item) => item.label}
          items={[
            { label: "Austin, TX" },
            { label: "Seattle, WA" },
            { label: "Phoenix, AZ" },
          ]}
          wrapperProps={{ className: "w-full" }}
          renderInput={(props) => {
            return (
              <input
                {...props}
                type="search"
                className="shadow-md rounded border-2 p-3 w-full text-center text-gray-800"
                placeholder="Search by city..."
              />
            );
          }}
          renderItem={(item, highlighted) => (
            <div
              key={item.id}
              style={{ backgroundColor: highlighted ? "#eee" : "transparent" }}
            >
              {item.label}
            </div>
          )}
          value={citySearchValue}
          onChange={(e) => setCitySearchValue(e.target.value)}
          onSelect={(val) => setCitySearchValue(val)}
        />
      </div>
    </>
  );
}
