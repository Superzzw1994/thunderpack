import { mix, clone, isString } from '@antv/util';

class Command {
  private _cfgs: any;
  private _events: null;
  private list: any[];
  private queue: any[]; // commands队列
  private destroyed: boolean;

  constructor() {
    this._cfgs = this.getDefaultCfg();
    this.list = [];
    this.queue = [];
    this.destroyed = false;
  }

  getDefaultCfg() {
    return { _command: { zoomDelta: .1, queue: [], current: 0, clipboard: [] } };
  }

  get(key) {
    return this._cfgs[key];
  }

  set(key, val) {
    this._cfgs[key] = val;
  }

  initPlugin(graph, customCommands = {}) {
    this.initCommands(customCommands);
    graph.getCommands = () => {
      return this.get('_command').queue;
    };
  }


  destroyPlugin() {
    this._events = null;
    this._cfgs = null;
    this.list = [];
    this.queue = [];
    this.destroyed = true;
  }

  _deleteSubProcessNode(graph, itemId) {
    const subProcess = graph.find('node', (node) => {
      if (node.get('model')) {
        const clazz = node.get('model').clazz;
        if (clazz === 'subProcess') {
          const containerGroup = node.getContainer();
          const subGroup = containerGroup.subGroup;
          const item = subGroup.findById(itemId);
          return subGroup.contain(item);
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    if (subProcess) {
      const group = subProcess.getContainer();
      const resultModel = group.removeItem(subProcess, itemId);
      graph.updateItem(subProcess, resultModel);
    }
  }

  initCommands(customCommands) {
    const cmdPlugin = this;
  }
}

export default Command;
