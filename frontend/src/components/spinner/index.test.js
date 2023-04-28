import React from "react";
import { render, screen } from "@testing-library/react";
import SpinnerComponent from "./index";

describe("SpinnerComponent", () => {
  test("renders spinner", () => {
    render(<SpinnerComponent data-testid="spinner-component" size="xl" />);
    const spinner = screen.getByTestId("spinner-component");
    expect(spinner).toBeInTheDocument();
  });
});
