import { useQuery, gql } from "@apollo/client";
import Image from "next/image";

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
    variables: { listId },
  });

  if (error) {
    console.error(error);
  }

  return (
    <div className="border-gray-200 border-1 bg-gray-50 shadow-md mx-5 rounded-lg mb-5">
      <h3 className="text-2xl pl-5 py-3 text-gray-800">{name}</h3>
      {!loading &&
        data.sights.map((s) => (
          <div className="pl-5 p-3 flex bg-gray-100 rounded-b-lg">
            <img
              src={s.image}
              alt="sight image"
              className="rounded-full h-10 w-10"
            />
            <div className="text-lg flex items-center pl-2 text-gray-800">
              {s.name}
            </div>
          </div>
        ))}
    </div>
  );
}
