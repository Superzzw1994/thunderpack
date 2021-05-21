import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ToolBar from './ToolBar';
import SideBar from './SideBar';
import './index.less';
import initChainNode from './config';
import { Chain, G6, InitToolbarPlugin } from './components/flow/index';

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
  const selectNodesIdList = useRef<{}>({
    selected: [],
    hover: []
  });
  const getGraph = (graph: Object) => {
    setGraph(graph);
  };
  const commands = useMemo(() => {
    return (data) => ({
      onNodeClick: {
        name: 'onNodeClick',
        execute(graph, params) {
          changeNodeState(graph, params, 'selected');
        }
      },
      onNodeDoubleClick: {
        name: 'onNodeDoubleClick',
        execute(graph, params) {
          nodeDoubleClick(graph, params);
        }
      },
      onNodeMouseOver: {
        name: 'onNodeMouseOver',
        execute(graph, params) {
          changeNodeState(graph, params, 'hover');
        }
      },
      onNodeMouseLeave: {
        name: 'onNodeMouseLeave',
        execute(graph) {
          cancelSelected(graph, 'hover');
        }
      },
      onCanvasClick: {
        name: 'onCanvasClick',
        execute(graph) {
          cancelSelected(graph, 'selected');
        }
      }
    });
  }, [data]);
  const nodeDoubleClick = (graph, params) => {
    const { event } = params;
    const node = event.item;
    const selectedNodes = graph.findAllByState('node', 'selected');
    const selectedEdges = graph.findAllByState('edge', 'selected');
    const hoverNodes = graph.findAllByState('node', 'hover');
    const hoverEdges = graph.findAllByState('edge', 'hover');
    [...selectedNodes, ...hoverNodes, ...selectedEdges, ...hoverEdges].filter(Boolean).forEach(item => {
      graph.setItemState(item, 'hover', false);
      graph.setItemState(item, 'selected', false);
    });
    graph.setItemState(node, 'selected', true);
  };
  const changeNodeState = (graph, params, type) => {
    const { event } = params;
    const node = event.item;
    const idList = getChain(node._cfg.model);
    selectNodesIdList.current[type] = idList;
    const hasSelected = node.hasState(type);
    idList.forEach(id => {
      const edges = graph.findById(id.toString()).getInEdges();
      edges.forEach(edge => {
        graph.setItemState(edge, type, !hasSelected);
      });
      graph.setItemState(id.toString(), type, !hasSelected);
    });
  };
  const cancelSelected = (graph, type) => {
    const selectedNodes = graph.findAllByState('node', 'selected');
    (selectNodesIdList.current[type].concat(...selectedNodes.map(node => node._cfg.id))).filter(Boolean).forEach(id => {
      const edges = graph.findById(id.toString()).getInEdges();
      edges.forEach(edge => {
        graph.setItemState(edge, type, false);
      });
      graph.setItemState(id.toString(), type, false);
    });
    selectNodesIdList.current[type] = [];
  };
  const getChain = (node) => {
    const parent = node.parentList;
    const child = returnChildId(node.nextList);
    return [...parent, node.cur, ...child];
  };
  const returnChildId = (list) => list.reduce((t, c) => {
    const { nextList, cur } = c;
    const res = returnChildId(nextList || []);
    return t.concat(cur, ...res);
  }, []);
  const filterCondition = (node) => node;
  const handleData = (node, parentList, filterCondition) => {
    const { nextList = [], cur } = node;
    const _nextList = (nextList || []).map(list => handleData(list, parentList.concat(cur.toString()), filterCondition));
    return {
      ...node,
      nextList: _nextList,
      parentList
    };
  };
  const _data = useMemo(() => {
    return data.topologyNode.map(i => handleData(i, [], filterCondition));
  }, [data]);
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
          type: 'callChainEdge'
        }}
        registerCustomNode={initChainNode}
        //data={data.topologyNode}
        data={_data}
        config={config}
        customCommands={commands(data)}
        toolBars={<ToolBar />}
        sideBar={<SideBar />}
        flowClassName={'flowWrapper'}
        getGraph={getGraph}
        graph={graph}
      />
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
