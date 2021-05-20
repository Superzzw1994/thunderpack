import { customCommand } from '../types';

export const initToolBarsCommand: customCommand = {
  toolBarClick: {
    name: 'toolBarClick',
    commandDidExecuted(graph, params) {
      const { currentItem: { key } } = params;
      graph.executeCommand(key, {}, params);
    }
  },
  zoomIn: {
    name: 'zoomIn',
    execute(graph, params) {
      const zoom = graph.getZoom();
      const { cfg } = graph;
      const { currentItem: { key, values: { type = 'original', multiple = 1.2, max = 10 } } } = params;
      const { width, height } = cfg;
      const size = type === 'original' ? {
        x: 0, y: 0
      } : { x: width / 2, y: height / 2 };
      graph.zoomTo(zoom < max ? zoom * multiple : max, size);
    }
  },
  zoomOut: {
    name: 'zoomOut',
    execute(graph, params) {
      const zoom = graph.getZoom();
      const { cfg } = graph;
      const { currentItem: { key, values: { type = 'original', multiple = 1.2, max = 10 } } } = params;
      const { width, height } = cfg;
      const size = type === 'original' ? {
        x: 0, y: 0
      } : { x: width / 2, y: height / 2 };
      graph.zoomTo(zoom > max ? zoom / multiple : max, size);
    }
  },
  resetZoom: {
    name: 'resetZoom',
    execute(graph, params) {
      graph.zoomTo(1);
      graph.fitView();
      // graph.moveTo(100, 100);
    }
  },
  onNodeClick: {
    name: 'onNodeClick',
    execute(graph, params) {
      const { event } = params;
      const shape = event.target;
      const node = event.item;
      return {
        shape,
        node,
        ...params
      };
    }
  },
  onNodeDoubleClick: {
    name: 'onNodeDoubleClick',
    commandWillExecute(graph, params = {}) {
      return params;
    },
    execute(graph, params) {
      const { event } = params;
      const shape = event.target;
      const node = event.item;
      return {
        shape,
        node,
        ...params
      };
    },
    commandDidExecuted(graph, data, cmd) {
    }
  },
  onCanvasClick: {
    name: 'onCanvasClick',
    execute(graph, params) {
      const { event } = params;
      const shape = event.target;
      const node = event.item;
      // console.log(shape);
      // console.log(node);
      // graph.moveTo(100, 100);
    }
  },
  onCanvasDoubleClick: {
    name: 'onCanvasDoubleClick',
    execute(graph, params) {
      const { event } = params;
      const shape = event.target;
      const node = event.item;
      // console.log(shape);
      // console.log(node);
      // graph.moveTo(100, 100);
    }
  }
};