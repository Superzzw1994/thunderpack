import { mix, clone, isString } from '@antv/util';

const initCommandProperty = {
  name,
  shortcutCodes: [],
  queue: true,
  executeTimes: 1,
  canExecute: true,
  commandWillExecute(graph, params = {}) {
    return Promise.resolve({
      ...params,
      data: {}
    });
  },
  commandShouldExecute(graph) {
    return this.canExecute;
  },
  execute(graph, res = {}) {
    return Promise.resolve({
      ...res
    });
  },
  commandDidExecuted(graph, data, cmd) {
    return Promise.resolve({
      ...data,
      cmd
    });
  }
};

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

    // 向全局暴露 获取当前全部commands 的接口
    graph.getCommands = (name) => {
      return this[name];
    };

    // 向全局暴露 获取customCommand是否可以执行 的接口
    graph.commandCanExecute = (name, canExecute = true) => {
      return this.enable(name, graph, canExecute);
    };

    // 向全局暴露 执行command 的 异步接口 (默认为异步)
    graph.executeCommand = (name, cfg?: object, params?: object) => {
      return this.execute(name, graph, cfg, params);
    };

    // 向全局暴露 执行command 的 同步接口
    graph.executeCommandSync = (name, cfg?: object, params?: object) => {
      this.execute(name, graph, cfg = {}, params = {});
    };
  }

  /**
   *  将 execute 制造成一个promise执行链，好处是可以支持和后端交互，并且可以将G6的事件执行拆开，解决callback hell， 只要暴露 graph 实例 就可以让用户通过
   *  调用(graph.executeCommand || graph.executeCommandSync) 来触发事件，支持异步与同步，默认为异步。(同步没什么卵用,主要目的为了解决ide报promise没有then警告)
   *  command的生命周期仿照react的生命周期，执行步骤如下
   *  1. commandShouldExecute  是否允许执行该命令，如果允许继续向下执行,如果不允许则什么也不做
   *  2. commandWillExecute 在command执行前做一些准备工作，可以发请求获取数据，基本没啥卵用，抄的react，如果有数据则返回数据，没有数据将返回空对象
   *  3. execute command真正执行的函数，内部可以拿到graph实例，处理G6的操作，返回之前的数据或者空对象
   *  4. commandDidExecuted ！！！ 这个钩子是封装command的关键，可以在内部执行其他的command，将执行链继续下去
   *
   */
  execute(name, graph, cfg, params) {
    const cmd = mix({}, this[name], cfg);
    const manager = this.get('_command');
    if (cmd.commandShouldExecute(graph, params)) {
      // emit一个全局事件, 在该command执行前处理一些与该command无关的操作
      graph.emit('beforeCommandExecute', { command: cmd, params });
      return Promise.resolve(cmd.commandWillExecute(graph, params) || {}).then(res => {
        return Promise.resolve(cmd.execute(graph, res) || {});
      }).then(res => {
        // emit一个全局事件, 在该command执行结束后处理一些与该command无关的操作
        graph.emit('afterCommandExecuted', { command: cmd, ...res });
        return Promise.resolve(cmd.commandDidExecuted(graph, res, cmd) || {});
      });
    }
  }

  enable(name, graph, canExecute) {
    if (this[name]) {
      this[name].canExecute = canExecute;
    }
    return this[name].canExecute;
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
    // 注册自定义command
    if (customCommands && Object.keys(customCommands).length) {
      Object.keys(customCommands).forEach(command => {
        cmdPlugin.registerCommand(command, customCommands[command]);
      });
    }
  }

  registerCommand(name, cfg) {
    if (this[name]) {
      mix(this[name], cfg);
    } else {
      const cmd = mix({}, {
        ...initCommandProperty
      }, cfg);
      this[name] = cmd;
      this.list.push(cmd);
    }
  }
}

export default Command;
