import { Suspense, useState } from "react";

import "./page.css";
import "handsfree/build/lib/assets/handsfree.css";
import Handsfree from "./Handsfree";
import ThreeDimModel from "./threeDModel";
import HomeButton from "./components/HomeButton/HomeButton";

function Page() {
  const [showHero, setShowHero] = useState(true);
  return (
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
          {/* <div> */}
          <HomeButton
            content="START AR DEMO"
            onClick={() => {
              setShowHero(false);
              window.handsfree.showDebugger();
              window.handsfree.unpause();
            }}
          />
          {/* </div> */}
        </div>
      )}

      {/* <div class="postHero"> */}
      <Suspense fallback={null}>
        <Handsfree />
      </Suspense>
      {/* </div> */}
      {/* <div className="postHero">
        <h2>AR-Demo</h2>
        <div class="handsfree-container">
          <Suspense fallback={null}>
          </Suspense>
        </div>
      </div> */}
    </div>
  );
}

export default Page;
