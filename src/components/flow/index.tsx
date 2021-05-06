import React, { useEffect, useRef } from 'react';
import G6 from '@antv/g6/lib';

interface flowProps {
  className?: string; // 容器类名
  height?: number; // 画布高度
  width?: number | string; // 画布宽度
  mode?: 'default' | 'view' | 'edit'; // 画布模式
}

const Flow: React.FC<flowProps> = (props) => {
  const { height, width, mode, className } = props;
  const graph = useRef(null as any);
  const flowRef = useRef(null as any);
  useEffect(() => {
    if (!graph.current) {
      const wrapperWidth = flowRef.current.offsetWidth;
      const wrapperHeight = flowRef.current.offsetHeight;
      graph.current = new G6.Graph({
        // plugins: plugins,
        container: flowRef.current,
        height: height || wrapperHeight,
        width: width || wrapperWidth
        // modes: {
        //   default: ['drag-canvas', 'clickSelected'],
        //   view: [],
        //   edit: ['drag-canvas', 'hoverNodeActived', 'hoverAnchorActived', 'dragNode', 'dragEdge',
        //     'dragPanelItemAddNode', 'clickSelected', 'deleteItem', 'itemAlign', 'dragPoint', 'brush-select']
        // }
        // defaultEdge: {
        //   type: 'flow-polyline-round'
        // }
      });
    }
  }, []);
  return <div className={className} ref={flowRef}></div>;
};
Flow.defaultProps = {
  mode: 'edit'
};
export default Flow;