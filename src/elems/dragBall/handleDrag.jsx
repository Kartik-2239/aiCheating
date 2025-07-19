import { useRef, useEffect, useState } from 'react';
import './drag.css';

export default function HandleDrag() {
  const timelineRef = useRef(null);
  const playheadRef = useRef(null);
  const [transparency, setTransparence] = useState('63')
  let isDragging = false;

  const onMouseDown = () => {
    isDragging = true;
  };

  const onMouseUp = () => {
    isDragging = false;
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;

    const timeline = timelineRef.current;
    const playhead = playheadRef.current;
    const rect = timeline.getBoundingClientRect();
    let newLeft = e.clientX - rect.left;
    setTransparence(newLeft*100/rect.left)
    console.log(transparency)

    newLeft = Math.max(0, Math.min(newLeft, timeline.offsetWidth));
    playhead.style.left = `${newLeft + 23}px`;
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
        <h3>Transparency</h3>
        <div ref={timelineRef} id='vid-box'>

            <div
                ref={playheadRef}
                id='play-head'
                onMouseDown={onMouseDown}
            />
        </div>
    </> 
    
  );
}
