import React, { useEffect, useRef, useState, Fragment } from 'react';
import G6 from '@antv/g6';
import ToolBar from './plugins/ToolBars';
import Command from './plugins/CommandLifeCycle';
import { commands, flowProps } from './types';
import { initToolBarsCommand } from '../../commons/initCommands';
import registerLayout from './layouts';
import registerShape from './shape';

const Flow: React.FC<flowProps> = (props) => {
  const { height, width, mode, className, getGraph, toolBars, customCommands, layout, data } = props;
  const [isReady, setIsReady] = useState(false);
  const toolBarRef = useRef(null);
  const graph = useRef(null as any);
  const flowRef = useRef(null as any);
  const commandRef = useRef<commands>({} as commands);
  useEffect(() => {
    if (!graph.current) {
      registerLayout(G6);
      registerShape(G6);
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
      // const fisheye = new G6.Fisheye({
      //   trigger: 'mousemove',
      //   d: 1.5,
      //   r: 200,
      //   maxD: 10,
      //   showLabel: true,
      //   showDPercent: false,
      //   scaleDBy: 'drag'
      // });
      // console.log(fisheye);
      // plugins.push(fisheye);
      // 继承父元素的宽高
      const wrapperWidth = flowRef.current.offsetWidth;
      const wrapperHeight = flowRef.current.offsetHeight;
      // 注册Layout

      graph.current = new G6.Graph({
        container: flowRef.current,
        height: height || wrapperHeight,
        width: width || wrapperWidth,
        plugins,
        modes: {
          default: ['drag-canvas']
        },
        // layout,
        defaultNode: {
          type: 'baseNode'
        }
        // defaultEdge: {
        //   type: 'polyline',
        //   size: 1,
        //   color: '#e2e2e2',
        //   style: {
        //     endArrow: {
        //       path: 'M 0,0 L 8,4 L 8,-4 Z',
        //       fill: '#e2e2e2'
        //     },
        //     radius: 20
        //   }
        // }
      });

      // 根据 mode 不同 初始化对应的commands
      commandRef.current.initPlugin(graph.current, {
        ...initToolBarsCommand
      });
      initGlobalEvents(graph.current);
      graph.current.data(data);
      graph.current.render();
      setIsReady(true);
    }
    return () => {
      unbindGlobalEvents(graph.current);
      graph.current = null;
    };
  }, []);

  useEffect(() => {
    if (getGraph && isReady) {
      getGraph(graph.current);
    }
  }, [getGraph, isReady]);

  useEffect(() => {
    if (customCommands) {
      commandRef.current.initPlugin(graph.current, customCommands);
    }
  }, [customCommands]);

  const beforeCommandExecute = (params) => {
  };

  const afterCommandExecuted = (params) => {
  };

  const initGlobalEvents = (graph) => {
    graph.on('beforeCommandExecute', beforeCommandExecute);
    graph.on('afterCommandExecuted', afterCommandExecuted);
  };

  const unbindGlobalEvents = (graph) => {
    if (graph) {
      graph.off('beforeCommandExecute', beforeCommandExecute);
      graph.off('afterCommandExecuted', afterCommandExecuted);
    }
  };
  return <Fragment>
    {toolBars && React.cloneElement(toolBars, {
      ref: toolBarRef,
      graph: graph.current
    })}
    <div className={'sideBar'}>SideBar</div>
    <div className={className} ref={flowRef}></div>
  </Fragment>;
};
Flow.defaultProps = {
  mode: 'edit',
  layout: {}
};
export default Flow;