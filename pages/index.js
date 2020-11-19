import { useQuery, gql } from "@apollo/client";
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
  const { loading: listsLoading, error: listError, data: listData } = useQuery(
    GET_LISTS_QUERY
  );

  return (
    <div className="">
      <h1 className="text-4xl p-4">🌍 Austin, Texas</h1>
      {!listsLoading &&
        listData.list.map((l) => <SightsList key={l.id} list={l} />)}
    </div>
  );
}
