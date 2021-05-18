import React, { useMemo, useRef } from 'react';
import { chainNode } from '../types';
import { baseConfig } from './config';
import { getBrotherChildrenCount, calcNodePosition } from './util';

const Chain = (props) => {
  const { data, layout, config } = props;
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
  // const calcNodePosition = (nodes: chainNode[], config, allNode: chainNode[]) => {
  //
  //   const { originalPoint, nodeSize, nodeSepFunc, rankSepFunc, parentPosition = undefined } = config;
  //
  //   return (nodes || []).reduce((t, node: chainNode, index, list: chainNode[]) => {
  //
  //     const { isRoot, nextList, level, pre, parentPosition, cur } = node;
  //
  //     const currentNode = list.find(item => parseInt(item.id as string) === cur);
  //
  //     const parentNode: chainNode | undefined = list.find(item => parseInt(item.id as string) === pre);
  //
  //     const _node = isRoot ? {
  //       ...node as object,
  //       ...originalPoint
  //     } : node;
  //     console.log(_node);
  //     const res = nextList && nextList.length ? calcNodePosition(nextList, Object.assign({}, config, {
  //       parentPosition: {
  //         x: _node.x,
  //         y: _node.y
  //       }
  //     }), nodes) : [];
  //     return t.concat(...res);
  //   }, []);
  // };

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
          y: chainConfig.originalPoint.y + index * chainConfig.rootMargin + currentMaxY.current
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


  // const newData = useMemo(() => {
  //   const { originalPoint, nodeSize, nodeSepFunc, rankSepFunc } = chainConfig;
  //   const { nodes } = _data;
  //   return calcNodePosition(nodes, chainConfig, nodes);
  // }, [_data, chainConfig]);

  return <React.Fragment>
    {React.Children.map(props.children, (child) => {
      return React.cloneElement(child, {
        data: _data,
        layout
      });
    })}
  </React.Fragment>;
};

export default Chain;