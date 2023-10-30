import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { InventoryContent } from "../components/InventoryContent";
import { DataProvider } from "../context/context";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo/client";

jest.mock("@apollo/client", () => ({
  useQuery: jest.fn(() => ({
    loading: false,
    error: null,
    data: {
      /* datos simulados */
    },
    refetch: jest.fn(),
  })),
}));

test("maneja la carga", () => {
  render(
    <ApolloProvider client={client}>
      <DataProvider>
        <InventoryContent />
      </DataProvider>
    </ApolloProvider>
  );
  const label = screen.getByText("Loading...");
  expect(label).toBeInTheDocument();
});

test("maneja errores", () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  const error = new Error("Simulated Error");
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.mock("@apollo/client", () => ({
    useQuery: jest.fn(() => ({
      loading: false,
      error: error,
      data: null,
      refetch: jest.fn(),
    })),
  }));

  render(
    <ApolloProvider client={client}>
      <DataProvider>
        <InventoryContent />
      </DataProvider>
    </ApolloProvider>
  );
  const label = screen.getByText("Error interno:");
  expect(label).toBeInTheDocument();
});
