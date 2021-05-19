import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ToolBar from './ToolBar';
import './index.less';
import Chain from './components/flow/BasicLayout/Chain';
import initChainNode from './config';

const customCommands = {};
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
    x: 10,
    y: 10
  },
  nodeSepFunc: () => 150,
  rankSepFunc: () => 20,
  nodeSize: {
    width: 150,
    height: 70
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
      <Chain
        modes={{
          default: ['drag-canvas']
        }}
        defaultNode={{
          type: 'callChainNode'
        }}
        defaultEdge={{
          type: 'polyline',
          style: {
            offset: 50,  // 拐弯处距离节点最小距离
            radius: 10,  // 拐弯处的圆角弧度，若不设置则为直角
            lineWidth: 2,
            stroke: '#A7B8C9'
          }
          // controlPoints: [{ x: 10, y: 20 }, { x: 20, y: 25 }]
          // 其他配置
        }}
        registerCustomNode={initChainNode}
        data={data}
        config={config}
        customCommands={customCommands}
        toolBars={<ToolBar />}
        flowClassName={'flowWrapper'}
        getGraph={getGraph}
        graph={graph}
      />
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
