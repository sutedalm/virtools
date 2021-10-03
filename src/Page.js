import { Suspense, useState } from "react";

import "./page.css";
import "handsfree/build/lib/assets/handsfree.css";
import Handsfree from "./Handsfree";
import ThreeDimModel from "./threeDModel";
import HomeButton from "./components/HomeButton/HomeButton";

function Page() {
  const [showHero, setShowHero] = useState(true);
  return (
    <>
    <div className="content">
      {showHero && (
        <div className="interactive-model-container">
          <div className="model-container">
            <Suspense fallback={null}>
              <ThreeDimModel />
            </Suspense>
          </div>
          <h1 className="main-title">VIRTOOLS</h1>
          <p>Space Apps Challenge - 2021</p>
          <div className="homebutton-container">
            <div className="handsfree-show-when-started">
              <HomeButton
                content="START AR DEMO"
                onClick={() => {
                  setShowHero(false);
                  window.handsfree.showDebugger();
                  window.handsfree.unpause();
                }}
              />
            </div>
            <div className="handsfree-show-when-loading">
              <HomeButton content="LOADING..." />
            </div>
          </div>
        </div>
      )}
      <Suspense fallback={null}>
        <Handsfree />
      </Suspense>
    </div>
    {
      !showHero && (
        <HomeButton
          content="Exit AR DEMO"
          onClick={() => {
            setShowHero(true);
            window.handsfree.hideDebugger();
            window.handsfree.pause();
          }}
        />
      )
    }
    </>
  );
}

export default Page;
