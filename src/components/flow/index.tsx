import React, { useEffect, useRef, useState, Fragment } from 'react';
import G6 from '@antv/g6';
import ToolBar from './plugins/ToolBars';

interface flowProps {
  className?: string; // 容器类名
  height?: number; // 画布高度
  width?: number | string; // 画布宽度
  mode?: 'default' | 'view' | 'edit'; // 画布模式
  getGraph?: (graph: Object) => void; // 获取 graph 实例的函数
  toolBars?: React.ReactElement // 工具栏的ReactNode
}

const Flow: React.FC<flowProps> = (props) => {
  const { height, width, mode, className, getGraph, toolBars } = props;
  const [isReady, setIsReady] = useState(false);
  const toolBarRef = useRef(null);
  const graph = useRef(null as any);
  const flowRef = useRef(null as any);
  useEffect(() => {
    if (!graph.current) {
      let plugins: {}[] = [];
      // 如果渲染工具栏就初始化 ToolBar 实例
      if (toolBarRef.current) {
        const toolbar = new ToolBar({
          container: toolBarRef.current
        });
        plugins.push(toolbar);
      }
      // 继承父元素的宽高
      const wrapperWidth = flowRef.current.offsetWidth;
      const wrapperHeight = flowRef.current.offsetHeight;
      graph.current = new G6.Graph({
        container: flowRef.current,
        height: height || wrapperHeight,
        width: width || wrapperWidth,
        plugins
      });
      setIsReady(true);
    }
  }, []);
  useEffect(() => {
    if (getGraph && isReady) {
      getGraph(graph.current);
    }
  }, [getGraph, isReady]);
  return <Fragment>
    {toolBars && React.cloneElement(toolBars, {
      ref: toolBarRef,
      graph: graph.current
    })}
    <div className={className} ref={flowRef}></div>
  </Fragment>;
};
Flow.defaultProps = {
  mode: 'edit'
};
export default Flow;