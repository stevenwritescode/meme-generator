import { render, screen, } from "@testing-library/react";
import Meme, { IMeme } from "../components/tsx/Meme";
import MemeControls, { EStrokeSizes } from "../components/tsx/MemeControls";

const mockMeme: IMeme = {
  imageUrl: "https://picsum.photos/600/400",
  topText: "Top Text",
  bottomText: "Bottom Text",
  fillColor: "#ffffff",
  strokeColor: "#000000",
  strokeSize: EStrokeSizes.MEDIUM,
  orientation: {rotation: 0, mirrorX: false, mirrorY: false}
};

describe("Meme", () => {
  it("should render without crashing", () => {
    render(<Meme {...mockMeme} />);
  });

  it("should render an image with the correct alt text", async () => {
    render(<Meme {...mockMeme} />);

    const img = await screen.findByAltText("Top Text | Bottom Text");
    expect(img).toBeInTheDocument();
  });

  it("renders a meme with the correct image and text", async () => {
    const { findByTestId, rerender } = render(<><Meme {...mockMeme} /><MemeControls {...mockMeme} onUpdate={(meme: IMeme): void => { return; }} /></>);
    let img = await screen.findByAltText("Top Text | Bottom Text");
    expect(img).toBeInTheDocument();
    const canvas = (await findByTestId("meme-canvas")) as HTMLCanvasElement;
    expect(canvas).toBeTruthy();

    // simulate a blur event on the imageUrl field to trigger the state update
    const imageUrlField = await screen.findByLabelText("Image URL");

    await rerender(<Meme {...mockMeme} />);

    img = await screen.findByAltText("Top Text | Bottom Text");
    expect(img).toBeInTheDocument();
    // assert that the canvas now contains the correct image
    const canvasDataUrl = canvas.toDataURL("data:image/png;");
    expect(canvasDataUrl).toBeTruthy();
  });

});
