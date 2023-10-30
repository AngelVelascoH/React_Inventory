import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

test("renderiza la app", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const headerText = screen.getByText("Inventory");
  expect(headerText).toBeInTheDocument();
});
test("redirige a la ruta automática /items", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const location = window.location;
  expect(location.pathname).toBe("/items");
});
