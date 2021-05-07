import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Flow from './components/flow';
import ToolBarsWrapper from './components/flow/components/ToolBarsWrapper';
import './index.less';

const customCommands = {
  addNode: {
    name: 'addNode',
    commandShouldExecute(graph) {
      return true;
    },
    commandWillExecute(graph) {
      return new Promise<Object>((resolve, reject) => {
        return resolve({
          age: 18
        });
      });
    },
    execute: (graph, data: Object) => {
      return new Promise<Object>((resolve, reject) => {
        return resolve({
          name: 'zzw',
          ...data
        });
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
