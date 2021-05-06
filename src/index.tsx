import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Flow from './components/flow';
import ToolBarsWrapper from './components/flow/components/ToolBarsWrapper';
import './index.less';
import ToolBar from './components/flow/plugins/ToolBars';

const Root = () => {
  const [graph, setGraph] = useState<Object | null>(null);
  const getGraph = (graph: Object) => {
    setGraph(graph);
  };
  return (
    <div className={'rootWrapper'}>
      <Flow className={'flowWrapper'} getGraph={getGraph}
            toolBars={<ToolBarsWrapper name={'zzw'} className={'toolBars'} detailEnums={{
              undo: {
                name: 123
              }
            }}>
              <div data-command={'undo'}>撤回</div>
              <div data-command={'add'}>添加</div>
            </ToolBarsWrapper>} />
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
