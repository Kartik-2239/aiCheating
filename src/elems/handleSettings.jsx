import { useRef, useState } from 'react';
import './settings.css';
import '../index.css';

import HandleDrag from './dragBall/handleDrag';

export default function Settings() {
  const [apiKey, setApiKey] = useState('');
  const inputkeyRef = useRef('')

  return (
    <div className="body">
      <div className="settings-box">
        <h3 className="question">Keys</h3>

        <div className="setting-item">
          <label>Gemini Api Key:</label>
            <input
                className='apikey-input'
                type="password"
                ref={inputkeyRef}
                value={apiKey}
                maxLength={39}
                

                onChange={(e) => {
                    setApiKey(e.target.value);
                }}
                onClick={async(e)=>{
                    const temp = await window.electronAPI.getApiKey()
                    if (temp){
                        setApiKey(temp)
                    }
                }}
            />
            <button
            onClick={()=>{
                setApiKey(inputkeyRef.current.value)
                window.electronAPI.shareApiKey(inputkeyRef.current.value)
                console.log(inputkeyRef.current.value)
            }}
            >CLICK</button>
        </div>
      </div>
      <div className='settings-box'>
        <h3>Shortcuts</h3>
        <div className='shortcut-item'>
            {['Right', 'Left','Up', 'Down'].map((direction)=><div className='shortcut'>
                <label>Move {direction}</label> <input value={'Cmd + ' + direction} />
            </div>)}
            <div className='shortcut'>
                <label>Toggle visibility</label>  <input value={'Cmd + /'}/>
            </div>
            <div className='shortcut'>
                <label>Toggle click-through</label> <input value={'Cmd + V'}/>
            </div>
        </div>
      </div>

      {/* <div className='settings-box'>
        <HandleDrag/>
      </div> */}
    </div>
  );
}
