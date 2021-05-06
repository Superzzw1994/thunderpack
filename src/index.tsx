import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Flow from './components/flow';
import ToolBarsWrapper from './components/flow/components/ToolBarsWrapper';
import './index.less';

const Root = () => {
  const [graph, setGraph] = useState<Object | null>(null);
  const getGraph = (graph: Object) => {
    setGraph(graph);
  };
  return (
    <div className={'rootWrapper'}>
      <ToolBarsWrapper className={'toolBars'}>
        <div>123</div>
        <div>123</div>
      </ToolBarsWrapper>
      <Flow className={'flowWrapper'} getGraph={getGraph} />
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
