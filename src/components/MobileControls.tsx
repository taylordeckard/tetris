import { MobileButton } from './MobileButton';
import 'styles/mobileControls.css';
import { ReactComponent as IconLeft } from 'icons/keyboard_arrow_left.svg';
import { ReactComponent as IconRight } from 'icons/keyboard_arrow_right.svg';
import { ReactComponent as IconDrop } from 'icons/drop.svg';
import { ReactComponent as IconRotate } from 'icons/rotate_left.svg';

export function MobileControls () {
  return (
    <div className="mobile-controls">
      <MobileButton type="ArrowLeft">
        <IconLeft/>
      </MobileButton>
      <MobileButton type=" ">
        <IconDrop/>
      </MobileButton>
      <MobileButton type="ArrowUp">
        <IconRotate/>
      </MobileButton>
      <MobileButton type="ArrowRight">
        <IconRight/>
      </MobileButton>
    </div>
  );
}
