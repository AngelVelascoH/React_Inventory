import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ContentHeader } from "../components/ContentHeader";
import { DataProvider } from "../context/context";

test("Verifica que el header muestre items y el label del search ", () => {
  render(
    <DataProvider>
      <ContentHeader onChildClick={() => {}} />
    </DataProvider>
  );
  const headerText = screen.getByText("Items");
  expect(headerText).toBeInTheDocument();
  const searchLabel = screen.getByLabelText("Name or ID");
  expect(searchLabel).toBeInTheDocument();
});

test("verifica la existencia del IconButton y simula un clic", () => {
  const onChildClickMock = jest.fn();

  render(
    <DataProvider>
      <ContentHeader onChildClick={onChildClickMock} />
    </DataProvider>
  );

  const iconButton = screen.getByRole("button");
  expect(iconButton).toBeInTheDocument();
  fireEvent.click(iconButton);
  expect(onChildClickMock).toHaveBeenCalledTimes(1);
});
