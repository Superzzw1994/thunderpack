import React, { useEffect, useRef, useState } from 'react';
import G6 from '@antv/g6/lib';
import ToolBar from './plugins/ToolBars';

interface flowProps {
  className?: string; // 容器类名
  height?: number; // 画布高度
  width?: number | string; // 画布宽度
  mode?: 'default' | 'view' | 'edit'; // 画布模式
  getGraph?: (graph: Object) => void
}

const Flow: React.FC<flowProps> = (props) => {
  const { height, width, mode, className, getGraph } = props;
  const [isReady, setIsReady] = useState(false);
  const graph = useRef(null as any);
  const flowRef = useRef(null as any);
  useEffect(() => {
    if (!graph.current) {
      const toolbar = new ToolBar({});
      const wrapperWidth = flowRef.current.offsetWidth;
      const wrapperHeight = flowRef.current.offsetHeight;
      graph.current = new G6.Graph({
        container: flowRef.current,
        height: height || wrapperHeight,
        width: width || wrapperWidth
      });
      setIsReady(true);
    }
  }, []);
  useEffect(() => {
    if (getGraph && isReady) {
      getGraph(graph.current);
    }
  }, [getGraph, isReady]);
  return <div className={className} ref={flowRef}></div>;
};
Flow.defaultProps = {
  mode: 'edit'
};
export default Flow;