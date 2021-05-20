import { deepMix, each } from '@antv/util';

class InitSideBarPlugin {
  private readonly _cfgs: any;
  private graph: any;

  constructor(cfgs, graph) {
    this._cfgs = deepMix(this.getDefaultCfg(), cfgs);
    this.graph = null;
  }

  getDefaultCfg() {
    return { container: null };
  }

  get(key) {
    return this._cfgs[key];
  }

  set(key, val) {
    this._cfgs[key] = val;
  }

  initPlugin(graph) {
    this.set('graph', graph);
    this.initEvents();
  }

  bindEvents(graph, parentNode) {
    const children = parentNode.querySelectorAll('div > div > .antd-collapse-item > .antd-collapse-content > .antd-collapse-content-box > div[data-item]');
    each(children, (child, i) => {
      const addModel = (new Function('return ' + child.getAttribute('data-item')))();
      // child.addEventListener('mousedown', e => {
      //   graph.set('addNodeDragging', true);
      //   graph.set('addModel', addModel);
      // });
      // child.addEventListener('mouseup', e => {
      //   graph.set('addNodeDragging', false);
      //   graph.set('addModel', null);
      // });
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

export default InitSideBarPlugin;