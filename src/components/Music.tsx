import { useEffect, useRef, useState } from 'react';
import { ReactComponent as IconVolumeOn } from 'icons/volume-high.svg';
import { ReactComponent as IconMute } from 'icons/volume-off.svg';

export function Music () {
  const audioRef = useRef<any>();
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      if (audioRef.current.paused && !muted) {
        audioRef.current.play();
      }
      audioRef.current.muted = muted;
    }
  }, [audioRef, muted])

  function getIcon () {
    if (muted) {
      return <IconVolumeOn/>
    }

    return <IconMute/>
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      fill: 'white',
      cursor: 'pointer',
    }} onClick={() => setMuted(!muted)}>
      { getIcon() }
      <audio
        preload="auto"
        src={`${process.env.PUBLIC_URL}/tetris.mp3`}
        ref={audioRef}
        loop></audio>
    </div>
  );

}
