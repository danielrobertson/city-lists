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
          width="25"
          className="text-gray-500 absolute"
          style={{ top: "24px", right: "35px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
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
              <>
                <style jsx>{`
                  input::placeholder {
                    color: #6b7280;
                  }
                `}</style>
                <input
                  {...props}
                  type="search"
                  className="rounded-lg bg-gray-200 p-2 w-full text-center "
                  placeholder="Search by city..."
                />
              </>
            );
          }}
          renderItem={(item, highlighted) => (
            <div
              key={item.id}
              style={{ backgroundColor: highlighted ? "#eee" : "" }}
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
