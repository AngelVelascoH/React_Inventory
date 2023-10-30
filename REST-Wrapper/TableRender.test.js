import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  getByLabelText,
} from "@testing-library/react";
import { TableRender } from "../InventoryApp/src/components/TableRender"; //
import { DataProvider } from "../InventoryApp/src/context/context"; //

describe("TableRender", () => {
  const testData = {
    Items: [
      {
        itemId: 1,
        itemName: "Item 1",
        description: "Description 1",
        location: {
          locationId: 1,
          state: "State 1",
          address: "Address 1",
          phoneNumber: 1234567890,
        },
      },
      {
        itemId: 2,
        itemName: "Item 2",
        description: "Description 2",
        location: {
          locationId: 2,
          state: "State 2",
          address: "Address 2",
          phoneNumber: 1234567899,
        },
      },
      //  más datos de prueba si es necesario
    ],
  };

  const context = {
    num: testData.Items.length,
    searchTerm: "",
    refresh: false,
  };

  it("debería renderizar correctamente", () => {
    const { container } = render(
      <DataProvider data={context}>
        <TableRender data={testData} filter="" />
      </DataProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("debería mostrar los elementos de la tabla", () => {
    render(
      <DataProvider data={context}>
        <TableRender data={testData} filter="" />
      </DataProvider>
    );

    // Comprueba que los elementos de la tabla estén presentes
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("debería filtrar los elementos de la tabla", () => {
    render(
      <DataProvider data={context}>
        <TableRender data={testData} filter="Item 1" />
      </DataProvider>
    );

    // Comprueba que los elementos filtrados estén presentes
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.queryByText("Item 2")).toBeNull(); // Asegura que otros elementos no estén presentes
  });

  it("debería mostrar un diálogo de confirmación al eliminar un ítem", () => {
    render(
      <DataProvider data={context}>
        <TableRender data={testData} filter="" />
      </DataProvider>
    );

    const itemIdToDelete = 1;
    const deleteButton = getByLabelText(`Eliminar ${itemIdToDelete}`);
    fireEvent.click(deleteButton);

    // Comprueba que se muestra el diálogo de confirmación
    expect(
      screen.getByText("¿Estas seguro que desesas eliminar el item 1?")
    ).toBeInTheDocument();
  });

  it("debería eliminar un ítem", async () => {
    render(
      <DataProvider data={context}>
        <TableRender data={testData} filter="" />
      </DataProvider>
    );

    const itemIdToDelete = 1;
    const deleteButton = getByLabelText(`Eliminar ${itemIdToDelete}`);
    fireEvent.click(deleteButton);

    // Confirma la eliminación
    const confirmButton = screen.getByText("Si, Eliminar");
    fireEvent.click(confirmButton);

    // Espera a que se elimine el ítem
    await waitFor(() => {
      expect(screen.queryByText("Item 1")).toBeNull();
    });
  });
});
