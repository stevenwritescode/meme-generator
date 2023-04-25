import { render, fireEvent } from "@testing-library/react";
import TextField from "../components/tsx/TextField";

describe("TextField", () => {
  const defaultProps = {
    className: "test",
    label: "Test label",
    value: "",
    onChange: jest.fn(),
    onBlur: jest.fn()
  };

  it("renders label correctly", () => {
    const { getByText } = render(<TextField {...defaultProps} />);
    expect(getByText("Test label")).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    const { getByLabelText } = render(<TextField {...defaultProps} />);
    const input = getByLabelText("Test label");
    fireEvent.change(input, { target: { value: "new value" } });
    expect(defaultProps.onChange).toHaveBeenCalledWith("new value");
  });

  it("calls onBlur when input is blurred", () => {
    const { getByLabelText } = render(<TextField {...defaultProps} />);
    const input = getByLabelText("Test label");
    fireEvent.blur(input);
    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  it("renders with the correct class name", () => {
    const { getByTestId } = render(<TextField {...defaultProps} className="test" />);
    expect(getByTestId("text-field")).toHaveClass("test");
  });
});
