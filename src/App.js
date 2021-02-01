import KeepAlive, { AliveScope } from './components/KeepAlive'
import './App.css';
import { useState } from 'react';
import Count from './components/Count';

function App() {
  const [isShow, setIsShow] = useState(true);

  return (
    <AliveScope>
      <div>
        <div>
          <button onClick={() => setIsShow(!isShow)}>toggle show</button>
        </div>
        {isShow && <Count />}
        {isShow && <KeepAlive id="test">
          <Count />
        </KeepAlive>}
      </div>
    </AliveScope>
  );
}

export default App;
