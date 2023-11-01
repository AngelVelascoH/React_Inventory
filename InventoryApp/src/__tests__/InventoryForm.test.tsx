import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DataProvider } from "../context/context";
import { MemoryRouter } from "react-router-dom";
import { InventoryForm } from "../components/InventoryForm";
import { MockedProvider } from "@apollo/client/testing";
import INSERT_ITEM from "../apollo/InsertData";

const dataMock = [
  {
    request: {
      query: INSERT_ITEM,
      variables: {
        itemId: 1,
        name: "Item 1",
        desc: "Item 1",
        locId: 1,
        state: "CDMX",
        address: "av 1 st 1",
        phone: "5515662716",
      },
    },
    result: {
      data: {
        createItem: {
          itemId: 1,
        },
      },
    },
  },
];

test("renderiza el formulario", () => {
  render(
    <MemoryRouter>
      <DataProvider>
        <MockedProvider>
          <InventoryForm />
        </MockedProvider>
      </DataProvider>
    </MemoryRouter>
  );
  const headerText = screen.getByText("Información del Artículo");
  expect(headerText).toBeInTheDocument();
  const locationText = screen.getByText("Información de la Ubicación");
  expect(locationText).toBeInTheDocument();
});
test("Verifica que los campos esten llenos", async () => {
  render(
    <MemoryRouter>
      <DataProvider>
        <MockedProvider>
          <InventoryForm />
        </MockedProvider>
      </DataProvider>
    </MemoryRouter>
  );

  const submitButton = screen.getByRole("button");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(
      screen.getByText("El ID del artículo es requerido")
    ).toBeInTheDocument();
    expect(
      screen.getByText("El nombre del artículo es requerido")
    ).toBeInTheDocument();
    expect(
      screen.getByText("La descripción del artículo es requerida")
    ).toBeInTheDocument();
    expect(
      screen.getByText("El ID de la ubicación es requerido")
    ).toBeInTheDocument();
    expect(screen.getByText("El estado es requerido")).toBeInTheDocument();
    expect(
      screen.getByText("El número de teléfono es requerido")
    ).toBeInTheDocument();
    expect(screen.getByText("La dirección es requerida")).toBeInTheDocument();
  });
});

test("Hace un registro exitoso", async () => {
  render(
    <MemoryRouter>
      <DataProvider>
        <MockedProvider mocks={dataMock} addTypename={false}>
          <InventoryForm />
        </MockedProvider>
      </DataProvider>
    </MemoryRouter>
  );
  const itemIdInput = screen.getByLabelText("Item ID");
  const itemNameInput = screen.getByLabelText("Nombre");
  const descriptionInput = screen.getByLabelText("Descripción");
  const locationIdInput = screen.getByLabelText("ID de Ubicación");
  const stateInput = screen.getByLabelText("Estado");
  const addressInput = screen.getByLabelText("Dirección");
  const phoneNumberInput = screen.getByLabelText("Teléfono");
  fireEvent.change(itemIdInput, { target: { value: "1" } });
  fireEvent.change(itemNameInput, { target: { value: "Item 1" } });
  fireEvent.change(descriptionInput, { target: { value: "Item 1" } });
  fireEvent.change(locationIdInput, { target: { value: "1" } });
  fireEvent.change(stateInput, { target: { value: "CDMX" } });
  fireEvent.change(addressInput, { target: { value: "av 1 st 1" } });
  fireEvent.change(phoneNumberInput, { target: { value: "5515662716" } });

  const submitButton = screen.getByRole("button");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(
      screen.getAllByText("Item agregado con éxito")[1]
    ).toBeInTheDocument();
  });
});

test("Hace un registro exitoso, y desea agregar más items", async () => {
  render(
    <MemoryRouter>
      <DataProvider>
        <MockedProvider mocks={dataMock} addTypename={false}>
          <InventoryForm />
        </MockedProvider>
      </DataProvider>
    </MemoryRouter>
  );
  const itemIdInput = screen.getByLabelText("Item ID");
  const itemNameInput = screen.getByLabelText("Nombre");
  const descriptionInput = screen.getByLabelText("Descripción");
  const locationIdInput = screen.getByLabelText("ID de Ubicación");
  const stateInput = screen.getByLabelText("Estado");
  const addressInput = screen.getByLabelText("Dirección");
  const phoneNumberInput = screen.getByLabelText("Teléfono");
  fireEvent.change(itemIdInput, { target: { value: "1" } });
  fireEvent.change(itemNameInput, { target: { value: "Item 1" } });
  fireEvent.change(descriptionInput, { target: { value: "Item 1" } });
  fireEvent.change(locationIdInput, { target: { value: "1" } });
  fireEvent.change(stateInput, { target: { value: "CDMX" } });
  fireEvent.change(addressInput, { target: { value: "av 1 st 1" } });
  fireEvent.change(phoneNumberInput, { target: { value: "5515662716" } });

  const submitButton = screen.getByRole("button");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);

  await waitFor(() => {
    const addMoreButton = screen.getByText("Si, Agregar más items");
    expect(addMoreButton).toBeInTheDocument();
    fireEvent.click(addMoreButton);
  });

  expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
});

test("Hace un registro exitoso, y desea volver", async () => {
  render(
    <MemoryRouter>
      <DataProvider>
        <MockedProvider mocks={dataMock} addTypename={false}>
          <InventoryForm />
        </MockedProvider>
      </DataProvider>
    </MemoryRouter>
  );
  const itemIdInput = screen.getByLabelText("Item ID");
  const itemNameInput = screen.getByLabelText("Nombre");
  const descriptionInput = screen.getByLabelText("Descripción");
  const locationIdInput = screen.getByLabelText("ID de Ubicación");
  const stateInput = screen.getByLabelText("Estado");
  const addressInput = screen.getByLabelText("Dirección");
  const phoneNumberInput = screen.getByLabelText("Teléfono");
  fireEvent.change(itemIdInput, { target: { value: "1" } });
  fireEvent.change(itemNameInput, { target: { value: "Item 1" } });
  fireEvent.change(descriptionInput, { target: { value: "Item 1" } });
  fireEvent.change(locationIdInput, { target: { value: "1" } });
  fireEvent.change(stateInput, { target: { value: "CDMX" } });
  fireEvent.change(addressInput, { target: { value: "av 1 st 1" } });
  fireEvent.change(phoneNumberInput, { target: { value: "5515662716" } });

  const submitButton = screen.getByRole("button");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);

  await waitFor(() => {
    const addMoreButton = screen.getByText("No, regresar al inventario");
    expect(addMoreButton).toBeInTheDocument();
    fireEvent.click(addMoreButton);
  });
  await waitFor(() => {
    const location = window.location;
    expect(location.pathname).toBe("/");
  });
});
