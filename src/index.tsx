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
            toolBars={<ToolBarsWrapper name={'zzw'} className={'toolBars'}>
              <div>123</div>
              <div>zzzzzzz</div>
            </ToolBarsWrapper>} />
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
