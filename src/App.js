import logo from './logo.svg';
import './App.css';

import Handsfree from 'handsfree'
import 'handsfree/build/lib/assets/handsfree.css'

function App() {
  const handsfree = new Handsfree({handpose: true})
  handsfree.enablePlugins('browser')

  function startHandsfree () {handsfree.start()}
  function stopHandsfree () {handsfree.stop()}

  return (
    <div className="App">
      <header className="App-header">
        {/* These classes are included by handsfree.css */}
        <p>
          <button className="handsfree-show-when-stopped handsfree-hide-when-loading" onClick={startHandsfree}>Start handsfree</button>
          <button className="handsfree-show-when-loading">...loading...</button>
          <button className="handsfree-show-when-started" onClick={stopHandsfree}>Stop handsfree</button>
        </p>

      </header>
    </div>
  );
}

export default App;
