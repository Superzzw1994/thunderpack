import React, { useMemo, useRef } from 'react';
import { chainNode } from '../types';
import { baseConfig } from './config';
import { getBrotherChildrenCount, calcNodePosition } from './util';
import Flow from '../index';

const Chain = (props) => {
  const { data, config, flowClassName, graph, ...rest } = props;
  const currentMaxY = useRef(0);
  const buildTree = (combo: chainNode, config, index = 0, deep, list) => {
    const { pre, nextList = [], cur } = combo;
    const isRoot = pre === '';
    const count = getBrotherChildrenCount(list, index);
    const node = calcNodePosition(isRoot, config, combo, count, deep);
    const childNodes = (nextList || []).reduce((t, c, index, list) => {
      const children = buildTree(c, {
        ...config, parentNodePosition: {
          x: node.x,
          y: node.y
        }
      }, index, deep + 1, list);
      return t.concat(...children);
    }, []);
    return [{
      ...node,
      level: index,
      id: `${cur}`,
      isRoot,
      deep,
      heightNum: childNodes ? childNodes.length : 0
    }, ...childNodes];
  };
  const chainConfig = useMemo(() => {
    return {
      ...baseConfig,
      ...config
    };
  }, [config]);
  const createEdges = (nodes) => {
    return (nodes || []).reduce((t, c, index, list) => {
      const { cur } = c;
      const target = list.filter(i => parseInt(i.pre) === parseInt(cur));
      return t.concat(...target.map(i => ({
        source: cur.toString(),
        target: i.cur.toString()
      })));
    }, []);
  };
  const _data = useMemo(() => {
    const { topologyNode } = data;
    const { nodes, edges } = topologyNode.reduce((t, lists, index) => {
      const { nodes, edges } = t;
      const config = {
        ...chainConfig,
        originalPoint: {
          x: chainConfig.originalPoint.x,
          y: index === 0 ? chainConfig.originalPoint.y : chainConfig.rootMargin + currentMaxY.current
        }
      };
      const currentNode = buildTree(lists, config, undefined, 0, []);
      const maxY = currentNode.reduce((t, c, index) => {
        if (index === 0) {
          return c.y;
        } else {
          return t > c.y ? t : c.y;
        }
      }, 0);
      currentMaxY.current = maxY;
      return {
        nodes: nodes.concat(...currentNode),
        edges: [...edges, ...createEdges(currentNode)]
      };
    }, {
      nodes: [],
      edges: []
    });
    // console.log(nodes);
    return {
      nodes,
      edges
    };
  }, [data, chainConfig]);
  return <Flow
    className={flowClassName}
    data={_data}
    {...rest}
  />;
};

export default Chain;