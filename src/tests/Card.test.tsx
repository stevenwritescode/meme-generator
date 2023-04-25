import React from "react";
import { render, screen } from "@testing-library/react";
import { IWrapper } from "../common/IWrapper";
import { IExtendableClass } from "../common/IExtendableClass";
import Card, { ICard } from "../components/tsx/Card";

describe("Card", () => {
  const props: ICard & IWrapper & IExtendableClass = {
    header: "Header content",
    footer: "Footer content",
    children: "Body content",
    className: "custom-class"
  };

  it("should render the Card component with header, footer, and body content", () => {
    render(<Card {...props} testId="main-card" />);
    expect(screen.getByTestId("card-header")).toHaveTextContent("Header content");
    expect(screen.getByTestId("card-body")).toHaveTextContent("Body content");
    expect(screen.getByTestId("card-footer")).toHaveTextContent("Footer content");
  });

  it("should render the Card component with the custom class", () => {
    render(<Card {...props} testId="main-card" className="custom-class" />);
    expect(screen.getByTestId("main-card")).toHaveClass("custom-class card");
  });

  it("should not render the header, body, or footer section if no content is provided", () => {
    render(<Card />);
    expect(screen.queryByTestId("card-header")).toBeNull();
    expect(screen.queryByTestId("card-body")).toBeNull();
    expect(screen.queryByTestId("card-footer")).toBeNull();
  });
});
