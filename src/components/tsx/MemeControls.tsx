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
    setStrokeColor: ({ hex }: ColorResult) => onUpdate({ ...props, strokeColor: hex }),
    rotateImage: () => {
      const orientation = { ...props.orientation };
      if (orientation.rotation - 90 < 0) {
        orientation.rotation = 270;
      } else {
        orientation.rotation = orientation.rotation - 90;
      }
      onUpdate({ ...props, orientation });
    },
    mirrorImage: ({ x, y }: { x?: boolean; y?: boolean }) => {
      const orientation = { ...props.orientation };
      if (x) {
        orientation.mirrorX = !orientation.mirrorX;
      }
      if (y) {
        orientation.mirrorY = !orientation.mirrorY;
      }
      onUpdate({ ...props, orientation });
    }
  };

  return (
    <div className="meme-controls" data-testid="meme-controls">
      <div className="control-group">
        <Card header="Meme Image" className="meme-control">
          <TextField label="Image URL" value={imageUrl} onBlur={handlers.setImageUrl} className="image-url-field" />
          <div className="orientation-buttons">
            <Button className="orientation" onClick={e => handlers.rotateImage()} testId="rotate-image-btn">
              <svg width="18px" height="22px" viewBox="0 0 22 22" version="1.1">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-679.000000, -2902.000000)">
                    <g transform="translate(100.000000, 2626.000000)">
                      <g transform="translate(578.000000, 274.000000)">
                        <g transform="translate(0.000000, 0.000000)">
                          <polygon id="Path" points="0 0 22 0 22 22 0 22" />
                          <path
                            d="M5.93,7.83 L2.28,11.49 C1.5,12.27 1.5,13.54 2.28,14.32 L5.94,17.98 C6.72,18.76 7.99,18.76 8.77,17.98 L12.43,14.33 C13.21,13.55 13.21,12.28 12.43,11.5 L8.76,7.82 C7.97,7.04 6.71,7.04 5.93,7.83 Z M4.4,12.19 L6.65,9.94 C7.04,9.55 7.67,9.55 8.07,9.94 L10.31,12.18 C10.7,12.57 10.7,13.2 10.31,13.59 L8.06,15.84 C7.67,16.23 7.04,16.23 6.64,15.84 L4.4,13.61 C4.01,13.22 4.01,12.58 4.4,12.19 Z M19.36,6.64 C17.61,4.88 15.3,4 13,4 L13,3.17 C13,2.28 11.92,1.83 11.29,2.46 L9.47,4.29 C9.08,4.68 9.08,5.31 9.47,5.7 L11.3,7.53 C11.92,8.16 13,7.72 13,6.83 L13,6 C15.02,6 17.03,6.86 18.45,8.61 C20.5,11.13 20.5,14.88 18.45,17.4 C17.03,19.14 15.02,20 13,20 C12.22,20 11.45,19.87 10.71,19.61 C10.35,19.49 9.96,19.6 9.69,19.87 C9.19,20.37 9.35,21.26 10.03,21.49 C10.99,21.83 11.99,22 13,22 C15.3,22 17.61,21.12 19.36,19.36 C22.88,15.85 22.88,10.15 19.36,6.64 Z"
                            fill="#000"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </Button>
            <Button className="orientation" active={props.orientation.mirrorX} onClick={e => handlers.mirrorImage({ x: true })} testId="mirror-x-btn">
              <svg width="18px" height="22px" viewBox="0 0 22 22" version="1.1">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-171.000000, -2769.000000)">
                    <g transform="translate(100.000000, 2626.000000)">
                      <g transform="translate(68.000000, 142.000000)">
                        <g>
                          <polygon id="Path" points="0 0 22 0 22 22 0 22" />
                          <path
                            d="M15,21 L17,21 L17,19 L15,19 L15,21 Z M19,9 L21,9 L21,7 L19,7 L19,9 Z M3,5 L3,19 C3,20.1 3.9,21 5,21 L9,21 L9,19 L5,19 L5,5 L9,5 L9,3 L5,3 C3.9,3 3,3.9 3,5 Z M19,3 L19,5 L21,5 C21,3.9 20.1,3 19,3 Z M11,23 L13,23 L13,1 L11,1 L11,23 Z M19,17 L21,17 L21,15 L19,15 L19,17 Z M15,5 L17,5 L17,3 L15,3 L15,5 Z M19,13 L21,13 L21,11 L19,11 L19,13 Z M19,21 C20.1,21 21,20.1 21,19 L19,19 L19,21 Z"
                            fill="#000"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </Button>
            <Button className="orientation" active={props.orientation.mirrorY} onClick={e => handlers.mirrorImage({ y: true })} testId="mirror-y-btn">
              <svg width="22px" height="18px" viewBox="0 0 22 22" version="1.1" transform="rotate(90)">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(-171.000000, -2769.000000)">
                    <g transform="translate(100.000000, 2626.000000)">
                      <g transform="translate(68.000000, 142.000000)">
                        <g>
                          <polygon id="Path" points="0 0 22 0 22 22 0 22" />
                          <path
                            d="M15,21 L17,21 L17,19 L15,19 L15,21 Z M19,9 L21,9 L21,7 L19,7 L19,9 Z M3,5 L3,19 C3,20.1 3.9,21 5,21 L9,21 L9,19 L5,19 L5,5 L9,5 L9,3 L5,3 C3.9,3 3,3.9 3,5 Z M19,3 L19,5 L21,5 C21,3.9 20.1,3 19,3 Z M11,23 L13,23 L13,1 L11,1 L11,23 Z M19,17 L21,17 L21,15 L19,15 L19,17 Z M15,5 L17,5 L17,3 L15,3 L15,5 Z M19,13 L21,13 L21,11 L19,11 L19,13 Z M19,21 C20.1,21 21,20.1 21,19 L19,19 L19,21 Z"
                            fill="#000"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </Button>
          </div>
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
