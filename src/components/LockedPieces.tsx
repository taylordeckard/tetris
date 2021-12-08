import { StateContext } from '../StateProvider';
import { useContext, useEffect, useRef } from 'react';
import { Group, Object3D } from 'three';
import { roundTenth } from '../utils';

export function LockedPieces (props: {
  lastLocked?: Group;
}) {
  const { state, dispatch } = useContext(StateContext);
  const lockedGroup = useRef<Group>();
  useEffect(() => {
    function dispatchLockedPieces () {
      if (lockedGroup.current) {
        const newState = {...state};
        state.lockedObjects = [...lockedGroup.current.children];
        dispatch?.(newState);
      }
    }
    function clearRows () {
      if (!lockedGroup.current) { return; }
      const checks: Set<number>[] = (new Array(18)).fill(0).map(() => new Set());
      const currentMeshes = [...lockedGroup.current.children];
      currentMeshes.forEach(mesh => {
        const x = roundTenth(mesh.position.x);
        const y = Math.round(mesh.position.y);
        checks[y].add(x);
      });
      const removedMeshes: Object3D[] = [];
      const removedRows: Set<number> = new Set();
      checks.forEach((row, idx) => {
        if (row.size === 10) {
          currentMeshes.forEach(mesh => {
            const y = Math.round(mesh.position.y);
            if (y === idx) {
              removedRows.add(idx);
              removedMeshes.push(mesh);
              mesh.removeFromParent();
            }
          });
        }
      });
      removedMeshes.forEach(mesh => {
        const currentMeshIdx = currentMeshes.indexOf(mesh);
        currentMeshes.splice(currentMeshIdx, 1);
      });
      if (removedRows.size) {
        removedRows.forEach(idx =>  {
          const filtered = currentMeshes.filter(mesh => Math.round(mesh.position.y) > idx);
          filtered
            .forEach(mesh => {
              mesh.position.y -= 1;
            });
        });
        dispatchLockedPieces();
      }
    }
    if (lockedGroup.current && props.lastLocked) {
      [...props.lastLocked.children].forEach(mesh => {
        return lockedGroup.current?.attach(mesh)
      });
      const newState = {...state};
      state.lockedObjects = [...lockedGroup.current.children];
      dispatch?.(newState);
      clearRows();
    }
  }, [props.lastLocked]);

  return (
    <group ref={lockedGroup}></group>
  );
}
