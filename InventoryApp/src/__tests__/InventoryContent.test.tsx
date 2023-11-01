import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { InventoryContent } from "../components/InventoryContent";
import { DataProvider } from "../context/context";
import GET_DATA from "../apollo/fetchSpecificDataAllItems";

import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";

it(" Renderiza Componentes e Items", async () => {
  const dataMock = {
    delay: 30,
    request: {
      query: GET_DATA,
    },
    result: {
      data: {
        Items: [
          // Agrega la lista de Items
          { itemId: 1, itemName: "Item 1" },
          { itemId: 2, itemName: "Item 2" },
          { itemId: 3, itemName: "Item 3" },
        ],
      },
    },
  };
  render(
    <MemoryRouter>
      <DataProvider>
        <MockedProvider mocks={[dataMock]} addTypename={false}>
          <InventoryContent />
        </MockedProvider>
      </DataProvider>
    </MemoryRouter>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("Item 1")).toBeInTheDocument();
  expect(await screen.findByText("Item 2")).toBeInTheDocument();
  expect(await screen.findByText("Item 3")).toBeInTheDocument();
});

it("Debería mostrar un error en la UI", async () => {
  const errorMock = {
    delay: 30,
    request: {
      query: GET_DATA,
    },
    error: new Error("Error interno"),
  };
  render(
    <MemoryRouter>
      <DataProvider>
        <MockedProvider mocks={[errorMock]} addTypename={false}>
          <InventoryContent />
        </MockedProvider>
      </DataProvider>
    </MemoryRouter>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("Error interno:")).toBeInTheDocument();
});
