import { Suspense } from 'react';

import "./page.css"
import "handsfree/build/lib/assets/handsfree.css";
import App from "./App"
import ThreeDimModel from './threeDModel'

function Page() {
  return (
    <div className="content">
      <div className="interactive-model-container">
        <div className="model-container">
          <Suspense fallback={null}>
            <ThreeDimModel />
          </Suspense>
        </div>
        <h1>VirTools</h1>
        <p>Space Apps Challenge - 2021</p>
      </div>
      <div className="postHero">
        <h2>AR-Demo</h2>
        <div class="handsfree-container">
          <Suspense fallback={null}>
            <App />
          </Suspense>
        </div>
      </div>
    </div>        
  )
}

export default Page;