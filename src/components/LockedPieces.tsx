import { useEffect, useRef } from 'react';
import { Group } from 'three';

export function LockedPieces (props: {
  lastLocked?: Group;
}) {
  const lockedGroup = useRef<Group>();
  useEffect(() => {
    if (lockedGroup.current && props.lastLocked) {
      [...props.lastLocked.children].forEach(mesh => {
        return lockedGroup.current?.attach(mesh)
      });
    }
  }, [props.lastLocked]);

  return (
    <group ref={lockedGroup}></group>
  );
}
