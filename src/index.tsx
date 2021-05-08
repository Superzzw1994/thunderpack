import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Flow from './components/flow';
import ToolBar from './ToolBar';
import './index.less';

const customCommands = {
  addNode: {
    name: 'addNode',
    commandShouldExecute(graph) {
      return true;
    },
    // commandWillExecute(graph) {
    //   return new Promise<Object>((resolve, reject) => {
    //     return resolve({
    //       age: 18
    //     });
    //   });
    // },
    execute: (graph, data: Object) => {
      return Promise.resolve({
        age: 18,
        ...data
      });
    }
  }
};
const Root = () => {
  const [graph, setGraph] = useState<Object | null>(null);
  const getGraph = (graph: Object) => {
    setGraph(graph);
  };
  return (
    <div className={'rootWrapper'}>
      <Flow className={'flowWrapper'}
            getGraph={getGraph}
            customCommands={customCommands}
            toolBars={<ToolBar />} />
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
