import { mix, clone, isString } from '@antv/util';

export default function(G6) {
  G6.registerLayout('callChain', {
    getDefaultCfg() {
      return {
        padding: [100, 100], // 与G6画布的padding值
        nodeSepFunc: () => 20,  // 节点x轴上的距离
        rankSepFunc: () => 20,   //  节点y轴上的距离
        nodeSize: {
          width: 100,
          height: 100
        }
      };
    },
    getRootNodeAndChildrenNodes(combo, nodes) {
      return nodes.reduce((t, c, index, list) => {
        const { pre, cur, next, id } = c;
        const existKeys = Object.keys(t);
        return existKeys.includes(cur) ? t : {
          ...t,
          [`${cur}-${id}`]: {
            ...c,
            children: list.filter(item => item.pre === cur)
          }
        };
      }, {});
    },
    buildTree(combo, nodes, config) {
      const relationNodes = nodes.filter(node => node.root === combo || node.cur === combo);
      const flatNodes = this.getRootNodeAndChildrenNodes(combo, nodes);
      return 1;
    },
    init(data) {
      const { nodes = [], edges = [] } = data;
      const customConfig = {
        padding: this.padding,
        nodeSepFunc: this.nodeSepFunc,
        rankSepFunc: this.rankSepFunc,
        nodeSize: this.nodeSize
      };
      // 获取用户传入的配置
      const config = mix(this.getDefaultCfg(), customConfig);
      const { baseNode, childNodes } = nodes.reduce((t, node) => {
        const { baseNode, childNodes } = t;
        const { isRoot } = node;
        return {
          baseNode: isRoot ? {
            ...baseNode,
            ...this.getOriginalNodePoint(node, config.padding)
          } : baseNode,
          childNodes: !isRoot ? childNodes.concat(node) : childNodes
        };
      }, {
        baseNode: {},
        childNodes: []
      });
      this.updateCfg({
        // combosMap,
        nodes, edges
      });
    },
    getOriginalNodePoint(baseNode, padding) {
      baseNode.x = 0 + padding[0];
      baseNode.y = 0 + padding[1];
      mix(this, {
        originalPoint: {
          x: baseNode.x,
          y: baseNode.y
        }
      });
    },
    execute() {
      const { nodes } = this;
      const customConfig = {
        padding: this.padding,
        nodeSepFunc: this.nodeSepFunc,
        rankSepFunc: this.rankSepFunc,
        nodeSize: this.nodeSize
      };
      // 获取用户传入的配置
      const config = mix(this.getDefaultCfg(), customConfig);
      this.nodes.forEach((node, index) => {
        node.x = 100 * (index + 1);
        node.y = 100;
        // if (node.isRoot) {
        //   this.getOriginalNodePoint(node, config.padding);
        // }
      });
    },
    layout(data) {
      // const self = this;
      // self.init(data);
      // self.execute();
    },
    updateCfg(cfg) {
      mix(this, cfg);
    },
    destroy() {
    }
  });
}