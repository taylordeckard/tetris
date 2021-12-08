import { Box3, Group } from 'three';

export function getBoundingBoxes (group: Group) {
  return group.children.map(mesh => {
    const box = new Box3();
    box.setFromObject(mesh);
    return box;
  });
}
