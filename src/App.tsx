import React, { useState } from "react";
import "./App.css";
import Meme, { IMeme } from "./components/tsx/Meme";
import Card from "./components/tsx/Card";
import MemeControls from "./components/tsx/MemeControls";

function App() {
  const [memeConfig, updateMemeConfig] = useState({
    fillColor: "#ffffff",
    strokeColor: "#000000",
    strokeSize: 2,
    imageUrl: "",
    topText: "",
    bottomText: "",
    orientation: { rotation: 0, mirrorX: false, mirrorY: false }
  });
  const handlers = {
    updateMeme: (meme: IMeme) => {
      updateMemeConfig(meme);
    }
  };
  return (
    <div className="app">
      <Card header="Meme Generator" footer="by Steven Williams" className="meme-generator" testId="main-card">
        <div className="app-ui">
          <Meme {...memeConfig} />
          <MemeControls {...memeConfig} onUpdate={handlers.updateMeme} />
        </div>
      </Card>
    </div>
  );
}

export default App;
