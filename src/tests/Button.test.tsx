import { render, fireEvent } from "@testing-library/react";
import Button from "../components/tsx/Button";

describe("Button", () => {
  it("renders without crashing", () => {
    render(<Button />);
  });

  it("renders children correctly", () => {
    const { getByText } = render(<Button>Hello World</Button>);
    expect(getByText("Hello World")).toBeInTheDocument();
  });

  it("applies custom class name correctly", () => {
    const { container } = render(<Button className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("applies active class correctly", () => {
    const { container } = render(<Button active />);
    expect(container.firstChild).toHaveClass("active");
  });

  it("applies color style correctly", () => {
    const { container } = render(<Button color="#ff0000" />);
    expect(container.firstChild).toHaveStyle("background-color: #ff0000");
  });

  it("calls onClick prop when clicked", () => {
    const handleClick = jest.fn();
    const { container } = render(<Button onClick={handleClick} />);
    expect(container).toBeTruthy();
    if (!container?.firstChild) {
      return;
    }
    fireEvent.click(container.firstChild);
    expect(handleClick).toHaveBeenCalled();
  });
});
