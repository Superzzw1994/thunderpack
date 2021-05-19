import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Flow from './components/flow';
import ToolBar from './ToolBar';
import './index.less';
import Chain from './components/flow/BasicLayout/Chain';

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
const data = {
  'topologyNode': [{
    'root': 'A',
    'pre': '',
    'cur': 0,
    'nextList': [
      {
        'root': 'A',
        'pre': 0,
        'cur': 1,
        'nextList': [
          {
            'root': 'A',
            'pre': 1,
            'cur': 2,
            'nextList': null
          }
        ]
      },
      {
        'root': 'A',
        'pre': 0,
        'cur': 3,
        'nextList': [
          {
            'root': 'A',
            'pre': 3,
            'cur': 4,
            'nextList': [
              {
                'root': 'A',
                'pre': 4,
                'cur': 5,
                'nextList': null
              }
            ]
          },
          {
            'root': 'A',
            'pre': 3,
            'cur': 6,
            'nextList': null
          },
          {
            'root': 'A',
            'pre': 3,
            'cur': 7,
            'nextList': [
              {
                'root': 'A',
                'pre': 7,
                'cur': 8,
                'nextList': null
              }
            ]
          }
        ]
      },
      {
        'root': 'A',
        'pre': 0,
        'cur': 10,
        'nextList': [
          {
            'root': 'A',
            'pre': 10,
            'cur': 11,
            'nextList': [
              {
                'root': 'A',
                'pre': 11,
                'cur': 12,
                'nextList': null
              }
            ]
          },
          {
            'root': 'A',
            'pre': 10,
            'cur': 13,
            'nextList': null
          },
          {
            'root': 'A',
            'pre': 10,
            'cur': 14,
            'nextList': [
              {
                'root': 'A',
                'pre': 14,
                'cur': 15,
                'nextList': null
              }
            ]
          }
        ]
      },
      {
        'root': 'A',
        'pre': 0,
        'cur': 17,
        'nextList': null
      },
      {
        'root': 'A',
        'pre': 0,
        'cur': 18,
        'nextList': null
      }
    ]
  }],
  'nodeNames': [
    'A',
    'B',
    'C',
    'D',
    'E'
  ]
};
const config = {
  originalPoint: {
    x: 200,
    y: 200
  },
  nodeSepFunc: () => 100,
  rankSepFunc: () => 100,
  nodeSize: {
    width: 100,
    height: 100
  },
  rootMargin: 200
};
const Root = () => {
  const [graph, setGraph] = useState<Object | null>(null);
  const getGraph = (graph: Object) => {
    setGraph(graph);
  };
  return (
    <div className={'rootWrapper'}>
      <Chain data={data} config={config}>
        <Flow className={'flowWrapper'}
              getGraph={getGraph}
              customCommands={customCommands}
              toolBars={<ToolBar />} />
      </Chain>
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
