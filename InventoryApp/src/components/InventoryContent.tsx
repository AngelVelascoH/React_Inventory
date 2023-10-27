import GET_DATA from "../apollo/fetchSpecificDataAllItems";
import { TableRender } from "./TableRender";

//apollo graphql
import { useQuery } from "@apollo/client";
import { useData } from "../context/context";
import { useEffect } from "react";

// Estados para la paginación

export const InventoryContent = () => {
  const context = useData();
  const { loading, error, data } = useQuery(GET_DATA);

  useEffect(() => {
    if (!loading && !error) {
      context.setData(data.Items.length);
    }
  }, [context.data, context.searchTerm, loading, error, data]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error interno:</p>;
  return (
    <>
      <TableRender data={data} filter={context.searchTerm}></TableRender>
    </>
  );
};
