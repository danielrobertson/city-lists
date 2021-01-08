import { useQuery, gql } from "@apollo/client";
import SightsList from "../components/SightsList";
import SearchBar from "../components/SearchBar";

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
    <div className="font-nunito">
      <div
        className="h-screen w-screen bg-cover absolute"
        style={{ backgroundImage: "url('/map.png')", zIndex: -1, top: 0 }}
      ></div>
      <div
        className="mt-3 ml-3 border-2 bg-gray-200 opacity-95 rounded-lg"
        style={{ width: "470px" }}
      >
        <SearchBar />
        <div className="mt-7">
          {!loading && data.list.map((l) => <SightsList key={l.id} list={l} />)}
        </div>
      </div>
    </div>
  );
}
