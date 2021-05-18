import { customCommand } from '../components/flow/types';

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
  }
};