import { useEffect, useState } from 'react';

export function MobileButton (props: {
  children: JSX.Element | JSX.Element[];
  type: 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | ' ';
}) {
  const [button, setButton] = useState<HTMLButtonElement | null>();

  useEffect(() => {
    function touchstartHandler (event: TouchEvent) {
      event.stopPropagation();
      event.preventDefault();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: props.type }));
    }
    function touchendHandler (event: TouchEvent) {
      event.stopPropagation();
      event.preventDefault();
      document.dispatchEvent(new KeyboardEvent('keyup', { key: props.type }));
    }
    if (button) {
      button.addEventListener('touchstart', touchstartHandler);
      button.addEventListener('touchend', touchendHandler);
    }
    return () => {
      button?.removeEventListener('touchstart', touchstartHandler);
      button?.removeEventListener('touchend', touchendHandler);
    }
  }, [button, props.type]);
  return (
    <button ref={setButton}>
      { props.children }
    </button>
  );
}
