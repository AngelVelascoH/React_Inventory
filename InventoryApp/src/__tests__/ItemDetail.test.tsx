import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { DataProvider } from "../context/context";
import { MockedProvider } from "@apollo/client/testing";
import GET_ALL_DATA from "../apollo/fetchAllDataofItem";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ItemDetail } from "../components/ItemDetail";

const dataMock = {
  request: {
    query: GET_ALL_DATA,
    variables: { itemId: 1 },
  },
  result: {
    data: {
      Item: {
        itemId: 1,
        itemName: "Item 1",
        description: "Item 1 desc",
        location: {
          locationId: 1,
          state: "state",
          address: "address",
          phoneNumber: 123456789,
        },
      },
    },
  },
};

it("Renderiza detalles del componente específico", async () => {
  const onChildClickMock = jest.fn();
  render(
    <MemoryRouter initialEntries={["/item/1/detail"]}>
      <DataProvider>
        <MockedProvider mocks={[dataMock]} addTypename={false}>
          <Routes>
            <Route
              path="/item/:id/detail"
              element={<ItemDetail onChildClick={onChildClickMock} />}
            ></Route>
          </Routes>
        </MockedProvider>
      </DataProvider>
    </MemoryRouter>
  );
  await waitFor(() => {
    expect(screen.getAllByText("Item 1")[0]).toBeInTheDocument();
    expect(screen.getAllByText("1")[0]).toBeInTheDocument();
    expect(screen.getByText("Item 1 desc")).toBeInTheDocument();
    expect(screen.getByText("state")).toBeInTheDocument();
    expect(screen.getByText("address")).toBeInTheDocument();
    expect(screen.getByText("123456789")).toBeInTheDocument();
  });
});

it("Regresa a la página anterior", async () => {
  const onChildClickMock = jest.fn();
  render(
    <MemoryRouter initialEntries={["/item/1/detail"]}>
      <DataProvider>
        <MockedProvider mocks={[dataMock]} addTypename={false}>
          <Routes>
            <Route
              path="/item/:id/detail"
              element={<ItemDetail onChildClick={onChildClickMock} />}
            ></Route>
          </Routes>
        </MockedProvider>
      </DataProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    const backButton = screen.getAllByRole("button")[0];
    fireEvent.click(backButton);
    expect(onChildClickMock).toHaveBeenCalledTimes(1);
  });
});
