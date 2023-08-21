import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

import { SearchBox } from "./SearchBox";

jest.useFakeTimers();

jest.mock("i18next", () => ({
  t: (key: string) => key,
}));

describe("SearchBox Component", () => {
  it("should render input", () => {
    render(<SearchBox />);
    const inputElement = screen.getByPlaceholderText("search");
    expect(inputElement).toBeInTheDocument();
  });

  it("should updates search value using useState", () => {
    render(<SearchBox />);
    const inputElement = screen.getByPlaceholderText("search");

    fireEvent.change(inputElement, { target: { value: "Chicken" } });

    expect(inputElement).toHaveValue("Chicken");
  });

  it("should calls onChange with debounced value", () => {
    const onChangeMock = jest.fn();
    render(<SearchBox onChange={onChangeMock} />);
    const inputElement = screen.getByPlaceholderText("search");

    act(() => {
      fireEvent.input(inputElement, { target: { value: "Chicken" } });
      jest.advanceTimersByTime(300);
    });

    expect(onChangeMock).toHaveBeenCalledWith("Chicken");
  });
});
