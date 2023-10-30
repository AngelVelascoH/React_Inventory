import GET_DATA from "../apollo/fetchSpecificDataAllItems";
import { TableRender } from "./TableRender";

//apollo graphql
import { useQuery } from "@apollo/client";
import { useData } from "../context/context";
import { useEffect } from "react";

// Estados para la paginación

export const InventoryContent = () => {
  const context = useData();
  let { loading, error, data, refetch } = useQuery(GET_DATA);
  useEffect(() => {
    if (context.refresh) {
      context.setRefreshValue(false);
      refetch();
    }
  }, [context.refresh]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error interno:</p>;
  return (
    <>
      <TableRender data={data} filter={context.searchTerm}></TableRender>
    </>
  );
};
