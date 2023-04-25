import "../css/MemeControls.css";
import TextField from "./TextField";
import { ColorResult, CompactPicker } from "react-color";
import { IMeme } from "./Meme";
import Button from "./Button";
import Card from "./Card";

export enum EStrokeSizes {
  NONE,
  LIGHT,
  MEDIUM,
  HEAVY
}

export interface IMemeControls {
  onUpdate: (meme: IMeme) => void;
}

const MemeControls: React.FC<IMeme & IMemeControls> = props => {
  const { imageUrl, topText, bottomText, fillColor, strokeColor, strokeSize, onUpdate } = props;
  const handlers = {
    setImageUrl: (imageUrl: string) => onUpdate({ ...props, imageUrl }),
    setTopText: (topText: string) => onUpdate({ ...props, topText }),
    setBottomText: (bottomText: string) => onUpdate({ ...props, bottomText }),
    setStrokeSize: (strokeSize: number) => onUpdate({ ...props, strokeSize }),
    setFillColor: ({ hex }: ColorResult) => onUpdate({ ...props, fillColor: hex }),
    setStrokeColor: ({ hex }: ColorResult) => onUpdate({ ...props, strokeColor: hex })
  };

  return (
    <div className="meme-controls" data-testid="meme-controls">
      <div className="control-group">
        <Card header="Meme Image" className="meme-control">
          <TextField label="Image URL" value={imageUrl} onBlur={handlers.setImageUrl} className="image-url-field" />
        </Card>
        <Card header="Meme Text" className="meme-control">
          <TextField label="Top Text" value={topText} onChange={handlers.setTopText} className="top-text-field" />
          <TextField label="Bottom Text" value={bottomText} onChange={handlers.setBottomText} className="bottom-text-field" />
        </Card>
      </div>
      <div className="control-group">
        <Card header="Text Style" className="meme-control">
          <label className="meme-control-label">Fill Color</label>
          <CompactPicker color={fillColor} onChangeComplete={handlers.setFillColor} />
          <hr />
          <label className="meme-control-label">Outline</label>

          <div className="stroke-buttons">
            <Button className="stroke-size" active={strokeSize === EStrokeSizes.NONE} onClick={e => handlers.setStrokeSize(EStrokeSizes.NONE)} testId="no-stroke">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="10" fill="transparent" stroke="#333" strokeWidth="3" />
                <line x1="55" y1="45" x2="45" y2="55" stroke="#333" strokeWidth="3" />
              </svg>
            </Button>
            <Button className="stroke-size" active={strokeSize === EStrokeSizes.LIGHT} onClick={e => handlers.setStrokeSize(EStrokeSizes.LIGHT)} testId="light-stroke">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="10" />
              </svg>
            </Button>
            <Button className="stroke-size" active={strokeSize === EStrokeSizes.MEDIUM} onClick={e => handlers.setStrokeSize(EStrokeSizes.MEDIUM)} testId="medium-stroke">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="20" />
              </svg>
            </Button>
            <Button className="stroke-size" active={strokeSize === EStrokeSizes.HEAVY} onClick={e => handlers.setStrokeSize(EStrokeSizes.HEAVY)} testId="heavy-stroke">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="30" />
              </svg>
            </Button>
          </div>
          <div>
            <CompactPicker color={strokeColor} onChangeComplete={handlers.setStrokeColor} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MemeControls;
