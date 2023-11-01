import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { DataProvider } from "../context/context";
import { MockedProvider } from "@apollo/client/testing";
import GET_DATA from "../apollo/fetchSpecificDataAllItems";
import DELETE from "../apollo/deleteItem";
import { MemoryRouter } from "react-router-dom";
import { TableRender } from "../components/TableRender";
const dataMock = {
  delay: 30,
  request: {
    query: GET_DATA,
  },
  result: {
    data: {
      Items: [
        // Agrega la lista de Items
        {
          itemId: 1,
          itemName: "Item 1",
          description: "",
          location: {
            locationId: 1,
            state: "",
            address: "",
            phoneNumber: 3,
          },
        },
        {
          itemId: 2,
          itemName: "Item 2",
          description: "",
          location: {
            locationId: 2,
            state: "",
            address: "",
            phoneNumber: 4,
          },
        },
        {
          itemId: 3,
          itemName: "Item 3",
          description: "",
          location: {
            locationId: 3,
            state: "",
            address: "",
            phoneNumber: 5,
          },
        },
        {
          itemId: 4,
          itemName: "Item 4",
          description: "",
          location: {
            locationId: 4,
            state: "",
            address: "",
            phoneNumber: 6,
          },
        },
        {
          itemId: 5,
          itemName: "Item 5",
          description: "",
          location: {
            locationId: 5,
            state: "",
            address: "",
            phoneNumber: 7,
          },
        },
        {
          itemId: 6,
          itemName: "Item 6",
          description: "",
          location: {
            locationId: 6,
            state: "",
            address: "",
            phoneNumber: 8,
          },
        },
      ],
    },
  },
};

const deleteItem = {
  request: {
    query: DELETE,
    variables: {
      itemId: 3,
    },
  },
  result: {
    data: {
      deleteItem: {
        itemId: 3,
      },
    },
  },
};
it("Renderiza tabla y componentes", async () => {
  render(
    <MemoryRouter>
      <DataProvider>
        <MockedProvider mocks={[dataMock]} addTypename={false}>
          <TableRender data={dataMock.result.data} filter="" />
        </MockedProvider>
      </DataProvider>
    </MemoryRouter>
  );
  await waitFor(() => {
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });
});

it("Renderiza botones de eliminado", async () => {
  render(
    <MemoryRouter>
      <DataProvider>
        <MockedProvider mocks={[dataMock]} addTypename={false}>
          <TableRender data={dataMock.result.data} filter="" />
        </MockedProvider>
      </DataProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    const iconButton = screen.getAllByTestId("DeleteForeverIcon");
    expect(iconButton).toHaveLength(5);
  });
});

it("Muestra correctamente la paginación", async () => {
  render(
    <MemoryRouter>
      <DataProvider>
        <MockedProvider mocks={[dataMock]} addTypename={false}>
          <TableRender data={dataMock.result.data} filter="" />
        </MockedProvider>
      </DataProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("Item 5")).toBeInTheDocument();
    expect(screen.queryByText("Item 6")).not.toBeInTheDocument();
  });
});

it("Utiliza la paginación para ver items restantes", async () => {
  render(
    <MemoryRouter>
      <DataProvider>
        <MockedProvider mocks={[dataMock]} addTypename={false}>
          <TableRender data={dataMock.result.data} filter="" />
        </MockedProvider>
      </DataProvider>
    </MemoryRouter>
  );
  const nextButton = screen.getByTitle("Go to next page");
  expect(nextButton).toBeInTheDocument();
  fireEvent.click(nextButton);
  await waitFor(() => {
    expect(screen.getByText("Item 6")).toBeInTheDocument();
    expect(screen.queryByText("Item 5")).not.toBeInTheDocument();
  });
});

it("Elimina un item", async () => {
  render(
    <MemoryRouter>
      <DataProvider>
        <MockedProvider mocks={[deleteItem]} addTypename={false}>
          <TableRender data={dataMock.result.data} filter="" />
        </MockedProvider>
      </DataProvider>
    </MemoryRouter>
  );
  const deleteButton = screen.getAllByTestId("DeleteForeverIcon")[2];
  fireEvent.click(deleteButton);
  const confirmButton = screen.getAllByTestId("delete3")[2];
  fireEvent.click(confirmButton);

  await waitFor(() => {
    expect(deleteItem.request.variables).toEqual({ itemId: 3 });
  });
});

it("Muestra solo los items que deba con filtro", async () => {
  render(
    <MemoryRouter>
      <DataProvider>
        <MockedProvider mocks={[deleteItem]} addTypename={false}>
          <TableRender data={dataMock.result.data} filter="Item 3" />
        </MockedProvider>
      </DataProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("Item 3")).toBeInTheDocument();
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 4")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 5")).not.toBeInTheDocument();
  });
});
