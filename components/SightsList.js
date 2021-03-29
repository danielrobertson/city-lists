import { useQuery, gql } from "@apollo/client";
import React from "react";
import PropTypes from "prop-types";

const GET_SIGHTS_QUERY = gql`
  query GetSights($listId: uuid!) {
    sights(where: { list_id: { _eq: $listId } }) {
      id
      image
      name
    }
  }
`;

export default function SightsList({ list }) {
  const { id: listId, name } = list;

  const { loading, error, data } = useQuery(GET_SIGHTS_QUERY, {
    variables: { listId }
  });

  if (error) {
    console.error(error);
  }

  return (
    <div className="border-gray-200 border-1 bg-purple-400 shadow-md mx-5 rounded-lg mb-5">
      <h3 className="text-2xl pl-5 py-3 text-gray-800">{name}</h3>
      {!loading &&
        data.sights.map((sight, idx) => (
          <>
            {idx !== 0 && <hr className="border-grey-800 px-lg" />}
            <div className="pl-5 p-3 flex bg-gray-100">
              <img
                src={sight.image}
                alt={`sight ${sight.name}`}
                className="rounded-full h-10 w-10"
              />
              <div className="text-lg flex items-center pl-2 text-gray-800">
                {sight.name}
              </div>
            </div>
          </>
        ))}
    </div>
  );
}

SightsList.propTypes = {
  list: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string
  }).isRequired
};
