import { ITestable } from "../../common";
import defaultPlaceholder from "../../assets/placeholder.png";
import "../css/Meme.css";
import { useEffect, useRef, useState } from "react";
import { EStrokeSizes } from "./MemeControls";

export interface IMeme {
  imageUrl: string;
  topText: string;
  bottomText: string;
  fillColor: string;
  strokeColor: string;
  strokeSize: number;
  orientation: { rotation: number; mirrorX: boolean; mirrorY: boolean };
}

interface ITextResizeConfig {
  ctx: CanvasRenderingContext2D;
  text: string;
  strokeSize: number;
  x: number;
  y: number;
  maxH: number;
  maxW: number;
}

// set max dimension for image (height or width)
const maxDim = 600,
  // set max sizes for meme text based on percentage of image size
  maxHeightPercent = 0.25,
  maxWidthPercent = 0.95;

const Meme: React.FC<IMeme & ITestable> = props => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null),
    [imageError, setImageError] = useState<boolean>(false),
    [imgSrc, setImageSrc] = useState<string>(""),
    [imgAlt, setImageAltText] = useState<string>(""),
    { imageUrl, topText, bottomText } = props,
    canvasRef = useRef<HTMLCanvasElement>(null);

  // side effect to re-generate the meme when props change
  useEffect(
    () => {
      if (canvasRef.current) {
        setCanvas(canvasRef.current);
      }

      if (canvas) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl || defaultPlaceholder;

        if (topText && bottomText) {
          img.alt = `${topText} | ${bottomText}`;
        } else if (topText || bottomText) {
          img.alt = `${topText || bottomText}`;
        } else {
          img.alt = "";
        }

        setImageAltText(img.alt);

        img.onload = () => {
          setImageError(false);
          loadImage(canvas, img, props);
          setImageSrc(canvas.toDataURL("data:image/png;base64"));
        };
        img.onerror = () => {
          setImageError(true);
        };
      }
    },
    [props, canvas, imageUrl, imageError, topText, bottomText]
  );

  return (
    <div data-testid="meme">
      <canvas ref={canvasRef} data-testid="meme-canvas" style={{ display: "none" }} />
      <img src={imgSrc} alt={imgAlt} />
      <div className={imageError ? "show image-load-error" : "image-load-error"} data-testid="image-load-error" style={imageError ? { display: "block" } : { display: "none" }}>
        Could Not Load Image!
      </div>
    </div>
  );
};

const loadImage = (canvas: HTMLCanvasElement, img: HTMLImageElement, props: IMeme) => {
  const { topText, bottomText, fillColor, strokeColor, strokeSize, orientation } = props;

  // get image dimensions
  let width = img.width,
    height = img.height,
    canvasWidth = canvas.width,
    canvasHeight = canvas.height,
    centerX = canvasWidth / 2,
    centerY = canvasHeight / 2;

  // reize image to fit in a 600px square
  if (width > maxDim || height > maxDim) {
    if (width > height) {
      height *= maxDim / width;
      width = maxDim;
    } else {
      width *= maxDim / height;
      height = maxDim;
    }
  }

  // set canvas size to new image's size
  canvas.width = width;
  canvas.height = height;

  // set the min and max size for the text based on the image size
  const maxW = maxWidthPercent * width,
    maxH = maxHeightPercent * height,
    yPad = canvas.height * 0.025,
    xScale = orientation.mirrorX ? -1 : 1,
    yScale = orientation.mirrorY ? -1 : 1;

  // get 2d canvas context
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // save the unrotated and unscaled state of the canvas
  ctx.save();

  // Translate the canvas to the center of the image
  ctx.translate(centerX, centerY);

  // Rotate the image
  ctx.rotate(Math.PI / (180 / orientation.rotation));

  // Flip the image
  ctx.scale(xScale, yScale);

  // Translate the canvas back to its original position
  ctx.translate(-centerX, -centerY);

  // Draw the image centered on the canvas
  ctx.drawImage(img, 0, 0, width, height);

  // restore the canvas to its original state
  ctx.restore();

  ctx.fillStyle = fillColor as string;
  ctx.strokeStyle = strokeColor as string;
  ctx.textAlign = "center";

  const config: ITextResizeConfig = {
    ctx,
    text: "",
    strokeSize: strokeSize || EStrokeSizes.MEDIUM,
    x: width / 2,
    y: yPad,
    maxW,
    maxH
  };

  if (topText) {
    // render top text
    ctx.textBaseline = "top";
    config.text = topText;
    renderResizedText(config);
  }
  if (bottomText) {
    // render bottom text
    ctx.textBaseline = "bottom";
    config.y = height - yPad;
    config.text = bottomText;
    renderResizedText(config);
  }
};

function renderResizedText(config: ITextResizeConfig) {
  const { ctx, text, strokeSize, x, y, maxW, maxH } = { ...config };
  let fontSize = maxH;

  ctx.font = `bold ${fontSize}px sans-serif`;

  const { width: textWidth } = ctx.measureText(text),
    scaleToFitWidth = maxW / textWidth,
    scaleToFitHeight = maxH / fontSize,
    scale = Math.min(scaleToFitWidth, scaleToFitHeight),
    newFontSize = fontSize * scale;

  ctx.font = `bold ${newFontSize}px sans-serif`;
  ctx.lineWidth = newFontSize / (50 / strokeSize);
  ctx.fillText(text, x, y);
  if (strokeSize) {
    ctx.font = `bold ${newFontSize + 0.1}px sans-serif`;
    ctx.strokeText(text, x, y);
  }
}

export default Meme;
