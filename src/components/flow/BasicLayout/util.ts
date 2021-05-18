import { chainNode } from '../types';

export const calcNodePosition = (isRoot, config, combo,count,deep,) => {
  const { pre, nextList = [], next, cur } = combo;
  const { originalPoint, nodeSize, nodeSepFunc, rankSepFunc, parentNodePosition, padding } = config;
  return isRoot ? {
    ...combo,
    x: originalPoint.x + padding.x,
    y: originalPoint.y + padding.y,
    parentId: pre
  } : {
    ...combo,
    x: (originalPoint.x + padding.x) + (deep * (nodeSize.width + nodeSepFunc())),
    y: (parentNodePosition ? parentNodePosition.y : padding.y) + count * ((rankSepFunc() + nodeSize.height)),
    parentId: pre
  };
};


export const getBrotherChildrenCount = (nodes: chainNode[], i) => nodes.reduce((t, c, index) => {
  if (index < i) {
    return t + getLength(c);
  } else {
    return t;
  }
}, 0);
const getLength = (node) => {
  const { nextList } = node;
  // const baseLength = nextList && nextList.length ? nextList.length : 0;
  const baseLength = nextList ? nextList.length : 1;
  const childrenLength = (nextList || []).reduce((t, c) => {
    const res = getLength(c);
    return t + res;
  }, 0);
  return childrenLength > baseLength ? childrenLength : baseLength;
};