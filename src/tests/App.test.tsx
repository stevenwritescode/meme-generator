import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("renders a heading with the text 'Meme Generator'", () => {
    const { getByRole } = render(<App />);
    const heading = getByRole("heading", { name: /meme generator/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders a Meme component with default props", () => {
    const { getByTestId } = render(<App />);
    const meme = getByTestId("meme");
    expect(meme).toBeInTheDocument();
  });

  it("renders a MemeControls component with default props", () => {
    const { getByTestId } = render(<App />);
    const memeControls = getByTestId("meme-controls");
    expect(memeControls).toBeInTheDocument();
  });
});
