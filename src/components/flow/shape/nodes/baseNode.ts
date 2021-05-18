import { ShapeOptions } from '@antv/g6-core/lib/interface/shape';

export default function(G6) {
  const options = {
    options: {
      stateStyles: {
        hover: {
          strokeStyle: '#008DFF',
          fill: '#FFFFFF',
          lineWidth: 1
        },
        selected: {
          strokeStyle: '#008DFF',
          fill: '#FFFFFF',
          lineWidth: 1
        }
      }
    },
    draw(cfg, group) {
      const { width = 100, height = 100, nodeName = 123, id, cur, parentId } = cfg;
      const shape = group.addShape('rect', {
        attrs: {
          width,
          height,
          fill: 'red',
          stroke: 'transparent',
          radius: [0, 0, 3, 3],
          shadowOffsetX: 0,
          shadowBlur: 4,
          shadowColor: 'rgba(55,70,95,0.2)',
          shadowOffsetY: 2,
          cursor: 'pointer'
        },
        draggable: true,
        name: 'background'
      });
      group.addShape('image', {
        attrs: {
          x: 16,
          y: 13,
          width: 12,
          height: 12,
          // img: iconEnum[getHealthKeyByScore(healthScore)],
          cursor: 'pointer'
        },
        name: 'icon'
      });
      group.addShape('rect', {
        attrs: {
          width,
          radius: [3, 3, 0, 0],
          height: 4,
          x: 0,
          y: -2
          // fill: getColorLevelByScore(healthScore),
          // stroke: 'rgba(123,128,168,0.3)',
        },
        name: 'border-box'
      });
      group.addShape('text', {
        attrs: {
          textBaseline: 'top',
          text: `${parentId}-${cur}`,
          fill: '#262626',
          x: 30,
          y: 14,
          // textAlign: 'center',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer'
        },
        draggable: true,
        name: 'nodeName'
      });
      group.addShape('text', {
        attrs: {
          textBaseline: 'top',
          // text: id,
          fill: '#8C8C8C',
          x: 16,
          y: 36,
          // textAlign: 'center',
          fontSize: 12,
          cursor: 'pointer'
        },
        draggable: true,
        name: 'serviceName'
      });
      return shape;
    }
  };
  G6.registerNode('baseNode', options, 'rect');
}
