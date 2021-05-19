import { chainNode } from '../types';

const compose = (operator) => operator.reduce((t, c) => {
  return (...args) => t(c(...args));
});

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

export const getBrotherChildrenCount = (nodes: chainNode[], i) => nodes.reduce((t, c, index) => {
  if (index < i) {
    return t + getLength(c);
  } else {
    return t;
  }
}, 0);

export const generateAnchorPoint = ({ node }) => {
  const { pre, nextList } = node;
  const { forward, back } = {
    forward: !!(nextList && nextList.length),
    back: pre === 0 ? true : !!pre
  };
  const anchorPoints = [
    back && [0, 0.5], // 左侧中间
    forward && [1, 0.5] // 右侧中间
  ].filter(Boolean);
  return {
    ...node,
    anchorPoints
  };
};

export const generateNodePosition = ({ isRoot, config, node, count, deep }) => {
  const { originalPoint, nodeSize, nodeSepFunc, rankSepFunc, parentNodePosition, padding } = config;
  const y = (parentNodePosition ? parentNodePosition.y : padding.y) + count * ((rankSepFunc() + nodeSize.height));
  const x = (originalPoint.x + padding.x) + (deep * (nodeSize.width + nodeSepFunc()));
  const rootX = originalPoint.x + padding.x;
  const rootY = originalPoint.y + padding.y;
  const _node = {
    ...node,
    x: isRoot ? rootX : x,
    y: isRoot ? rootY : y
  };
  return {
    isRoot, config, node: _node, count, deep
  };
};

export const generateNodeSize = ({ isRoot, config, node, count, deep }) => {
  const { nodeSize } = config;
  const _node = {
    ...node,
    width: nodeSize.width,
    height: nodeSize.height
  };
  return {
    isRoot, config, node: _node, count, deep
  };
};

export const calcNodePosition = (isRoot, config, node, count, deep) => compose([generateAnchorPoint, generateNodePosition, generateNodeSize])({
  isRoot, config, node, count, deep
});

