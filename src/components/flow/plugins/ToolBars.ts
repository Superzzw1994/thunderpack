import { deepMix, each, wrapBehavior } from '@antv/util';
import { modifyCSS } from '@antv/dom-util';

class Toolbar {
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
    const events = self.getEvents();
    const bindEvents = {};
    each(events, (v, k) => {
      const event = wrapBehavior(self, v);
      bindEvents[k] = event;
      graph.on(k, event);
    });
    this._events = bindEvents;
    this.initEvents();
    // this.updateToolbar();
  }

  getEvents() {
    return { afterItemSelected: 'updateToolbar', afterCommandexecuted: 'updateToolbar' };
  }

  initEvents() {
    const graph = this.get('graph');
    const parentNode = this.get('container');
    const children = parentNode.querySelectorAll('div[data-command]');
    each(children, (child, i) => {
      const cmdName = child.getAttribute('data-command');
      child.addEventListener('click', e => {
        return graph.commandCanExecute(cmdName) && graph.executeCommand(cmdName);
      });
    });
  }

  // updateToolbar() {
  //   const graph = this.get('graph');
  //   const parentNode = this.get('container');
  //   const children = parentNode.querySelectorAll('div[data-command]');
  //   each(children, (child, i) => {
  //     const cmdName = child.getAttribute('data-command');
  //     if (graph.commandCanExecute(cmdName)) {
  //       modifyCSS(child, {
  //         cursor: 'pointer'
  //       });
  //       modifyCSS(child.children[0], {
  //         color: '#666'
  //       });
  //       child.children[0].setAttribute('color', '#666');
  //     } else {
  //       modifyCSS(child, {
  //         cursor: 'pointer'
  //       });
  //       console.log(child.children[0]);
  //       // modifyCSS(child.children[0], {
  //       //   color: '#bfbfbf'
  //       // });
  //       // child.children[0].setAttribute('color', '#bfbfbf');
  //     }
  //   });
  // }

  destroyPlugin() {
    this.get('canvas').destroy();
    const container = this.get('container');
    container.parentNode.removeChild(container);
  }
}

export default Toolbar;
