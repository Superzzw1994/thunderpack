import { deepMix, each, wrapBehavior } from '@antv/util';
import { modifyCSS } from '@antv/dom-util';

class InitToolbarPlugin {
  private readonly _cfgs: any;
  private _events: any;

  constructor(cfgs: any) {
    this._cfgs = deepMix(this.getDefaultCfg(), cfgs);
  }

  getDefaultCfg() {
    return { container: null };
  }

  get(key: any) {
    return this._cfgs[key];
  }

  set(key: any, val: any) {
    this._cfgs[key] = val;
  }

  initPlugin(graph: any) {
    const self = this;
    this.set('graph', graph);
    // const events = self.getEvents();
    // const bindEvents = {};
    // each(events, (v, k) => {
    //   const event = wrapBehavior(self, v);
    //   bindEvents[k] = event;
    //   graph.on(k, event);
    // });
    // this._events = bindEvents;
    this.initEvents();
    // this.updateToolbar();
  }

  getEvents() {
    return { afterItemSelected: 'updateToolbar', afterCommandExecuted: 'updateToolbar' };
  }

  bindEvents(graph, parentNode) {
    const children = parentNode.querySelectorAll('div[data-command]');
    each(children, (child, i) => {
      const cmdName = child.getAttribute('data-command');
      const cmdDetail = child.getAttribute('data-detail');
      child.addEventListener('click', e => {
        return graph.commandCanExecute('toolBarClick') && graph.executeCommand('toolBarClick', {}, {
          currentItem: {
            key: cmdName,
            values: JSON.parse(cmdDetail)
          }
        });
      });
    });
  }
  initEvents() {
    const graph = this.get('graph');
    const parentNode = this.get('container');
    this.bindEvents(graph, parentNode);
  }

  destroyPlugin() {
    this.get('canvas').destroy();
    const container = this.get('container');
    container.parentNode.removeChild(container);
  }
}

export default InitToolbarPlugin;
