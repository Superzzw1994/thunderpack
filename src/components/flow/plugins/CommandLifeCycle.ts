import { mix, clone, isString } from '@antv/util';

class Command {
  private _cfgs: any;
  private _events: null;
  private list: any[];
  private queue: any[];
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
    graph.getCurrentCommand = () => {
      const c = this.get('_command');
      return c.queue[c.current - 1];
    };
    graph.executeCommand = (name, cfg) => {
      this.execute(name, graph, cfg);
    };
    graph.commandEnable = (name) => {
      return this.enable(name, graph);
    };
  }

  // registerCommand(name, cfg) {
  //   if (this[name]) {
  //     mix(this[name], cfg);
  //   } else {
  //     const cmd = mix({}, {
  //       name: name,
  //       shortcutCodes: [],
  //       queue: true,
  //       executeTimes: 1,
  //       init() {
  //       },
  //       enable() {
  //         return true;
  //       },
  //       execute(graph) {
  //         this.snapShot = graph.save();
  //         this.selectedItems = graph.get('selectedItems');
  //         this.method && (isString(this.method) ? graph[this.method]() : this.method(graph));
  //       },
  //       back(graph) {
  //         graph.read(this.snapShot);
  //         graph.set('selectedItems', this.selectedItems);
  //       }
  //     }, cfg);
  //     this[name] = cmd;
  //     this.list.push(cmd);
  //   }
  // }

  execute(name, graph, cfg) {
    const cmd = mix({}, this[name], cfg);
    const manager = this.get('_command');
    if (cmd.enable(graph)) {
      cmd.init();
      if (cmd.queue) {
        manager.queue.splice(manager.current, manager.queue.length - manager.current, cmd);
        manager.current++;
      }
    }
    graph.emit('beforecommandexecute', { command: cmd });
    cmd.execute(graph);
    graph.emit('aftercommandexecute', { command: cmd });
    return cmd;
  }

  enable(name, graph) {
    return this[name].enable(graph);
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
