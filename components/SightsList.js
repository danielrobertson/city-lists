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

  return (
    <>
      <h3 className="text-4xl pl-8 text-accent-1">{name}</h3>
      {!loading &&
        data.sights.map((s) => (
          <div className="pl-12 p-3 flex">
            <img
              src={s.image}
              alt="sight image"
              className="rounded-full h-12 w-12"
            />
            <div className="text-lg flex items-center pl-3">{s.name}</div>
          </div>
        ))}
    </>
  );
}
