import { Suspense } from "react";

import "./page.css";
import "handsfree/build/lib/assets/handsfree.css";
import Handsfree from "./Handsfree";
import ThreeDimModel from "./threeDModel";
import HomeButton from "./components/HomeButton/HomeButton";

function Page() {
  return (
    <div className="content">
      <div className="interactive-model-container">
        <div className="model-container">
          <Suspense fallback={null}>
            <ThreeDimModel />
          </Suspense>
        </div>
        <h1 className="main-title">VIRTOOLS</h1>
        <p>Space Apps Challenge - 2021</p>
        <HomeButton content="START AR DEMO" />
      </div>
      <div className="postHero">
        <h2>AR-Demo</h2>
        <div class="handsfree-container">
          <Suspense fallback={null}>
            <Handsfree />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Page;
