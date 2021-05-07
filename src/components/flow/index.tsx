import React, { useEffect, useRef, useState, Fragment } from 'react';
import G6 from '@antv/g6';
import ToolBar from './plugins/ToolBars';
import Command from './plugins/CommandLifeCycle';
import { commands, flowProps } from './types';


const Flow: React.FC<flowProps> = (props) => {
  const { height, width, mode, className, getGraph, toolBars, wrapperClassName, customCommands } = props;
  const [isReady, setIsReady] = useState(false);
  const toolBarRef = useRef(null);
  const graph = useRef(null as any);
  const flowRef = useRef(null as any);
  const commandRef = useRef<commands>({} as commands);
  useEffect(() => {
    if (!graph.current) {
      let plugins: {}[] = [];

      // 初始化 Command系统实例, 并保存到ref中, 保留在 数据更新或用户传入customCommands 时增加系统command的能力(通过在useEffect监听的变量更新时调用initPlugin实现)
      commandRef.current = new Command();
      plugins.push(commandRef.current);


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
      initGlobalEvents(graph.current);
      setIsReady(true);
    }
  }, []);
  useEffect(() => {
    if (getGraph && isReady) {
      getGraph(graph.current);
    }
    commandRef.current.initPlugin(graph.current, customCommands);
  }, [getGraph, isReady]);
  const initGlobalEvents = (graph) => {
    graph.on('beforeCommandExecute', (params) => {
    });
    graph.on('afterCommandExecuted', (params) => {
    });
  };
  return <Fragment>
    {toolBars && React.cloneElement(toolBars, {
      ref: toolBarRef,
      graph: graph.current,
    })}
    <div className={className} ref={flowRef}></div>
  </Fragment>;
};
Flow.defaultProps = {
  mode: 'edit'
};
export default Flow;