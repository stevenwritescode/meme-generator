import { render, fireEvent } from "@testing-library/react";
import { IMeme } from "../components/tsx/Meme";
import MemeControls, { EStrokeSizes, IMemeControls } from "../components/tsx/MemeControls";

describe("MemeControls", () => {
  const mockMeme: IMeme = {
    imageUrl: "https://example.com/meme.jpg",
    topText: "Hello",
    bottomText: "World",
    fillColor: "#FFFFFF",
    strokeColor: "#000000",
    strokeSize: EStrokeSizes.MEDIUM
  };
  const mockOnUpdate = jest.fn();
  const mockProps: IMeme & IMemeControls = {
    ...mockMeme,
    onUpdate: mockOnUpdate
  };

  beforeEach(() => {
    mockOnUpdate.mockClear();
  });

  test("renders the MemeControls component", () => {
    const { getByTestId } = render(<MemeControls {...mockProps} />);
    const memeControls = getByTestId("meme-controls");
    expect(memeControls).toBeInTheDocument();
  });

  test("updates the imageUrl field", () => {
    const { getByLabelText } = render(<MemeControls {...mockProps} />);
    const imageUrlField = getByLabelText("Image URL") as HTMLInputElement;
    const newImageUrl = "https://example.com/new-meme.jpg";
    fireEvent.blur(imageUrlField, { target: { value: newImageUrl } });
    expect(mockOnUpdate).toHaveBeenCalledWith({ ...mockProps, imageUrl: newImageUrl });
  });

  test("updates the topText field", () => {
    const { getByLabelText } = render(<MemeControls {...mockProps} />);
    const topTextField = getByLabelText("Top Text") as HTMLInputElement;
    const newTopText = "Hi";
    fireEvent.change(topTextField, { target: { value: newTopText } });
    expect(mockOnUpdate).toHaveBeenCalledWith({ ...mockProps, topText: newTopText });
  });

  test("updates the bottomText field", () => {
    const { getByLabelText } = render(<MemeControls {...mockProps} />);
    const bottomTextField = getByLabelText("Bottom Text") as HTMLInputElement;
    const newBottomText = "there";
    fireEvent.change(bottomTextField, { target: { value: newBottomText } });
    expect(mockOnUpdate).toHaveBeenCalledWith({ ...mockProps, bottomText: newBottomText });
  });

  test("updates the strokeSize", () => {
    const { getByTestId } = render(<MemeControls {...mockProps} />);
    const strokeSizeNoneButton = getByTestId("no-stroke");
    const strokeSizeLightButton = getByTestId("light-stroke");
    const strokeSizeMediumButton = getByTestId("medium-stroke");
    const strokeSizeHeavyButton = getByTestId("heavy-stroke");

    fireEvent.click(strokeSizeNoneButton);
    expect(mockOnUpdate).toHaveBeenCalledWith({ ...mockProps, strokeSize: EStrokeSizes.NONE });
    fireEvent.click(strokeSizeLightButton);
    expect(mockOnUpdate).toHaveBeenCalledWith({ ...mockProps, strokeSize: EStrokeSizes.LIGHT });
    fireEvent.click(strokeSizeMediumButton);
    expect(mockOnUpdate).toHaveBeenCalledWith({ ...mockProps, strokeSize: EStrokeSizes.MEDIUM });
    fireEvent.click(strokeSizeHeavyButton);
    expect(mockOnUpdate).toHaveBeenCalledWith({ ...mockProps, strokeSize: EStrokeSizes.HEAVY });
  });
});
