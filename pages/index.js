import { gql, useQuery } from "@apollo/client";
import React from "react";
import SearchBar from "../components/SearchBar";
import SightsList from "../components/SightsList";

const GET_LISTS_QUERY = gql`
  query GetLists {
    list(where: { city: { _eq: "Austin" }, state: { _eq: "Texas" } }) {
      id
      name
      state
      city
    }
  }
`;

export default function IndexPage() {
  const { loading, error, data } = useQuery(GET_LISTS_QUERY);

  if (error) {
    console.error(error);
  }

  return (
    <div>
      <div className="bg-white shadow-2xl h-screen" style={{ width: "470px" }}>
        <div className="pt-5 px-4">
          <SearchBar onClear={() => {}} onSearch={() => {}} />
        </div>
        <div className="mt-7">
          {!loading && data.list.map(l => <SightsList key={l.id} list={l} />)}
        </div>
      </div>
      <div
        className="h-screen w-screen bg-cover absolute"
        style={{ backgroundImage: "url('/map.png')", zIndex: -1, top: 0 }}
      />
    </div>
  );
}
