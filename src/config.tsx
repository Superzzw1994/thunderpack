import { fittingString } from './components/flow/tools';
// import disaster from 'SRC_COMP/basic/BasicG6/asset/icon/node-icon-disaster.svg';
// import critical from 'SRC_COMP/basic/BasicG6/asset/icon/node-icon-critical.svg';
// import average from 'SRC_COMP/basic/BasicG6/asset/icon/node-icon-average.svg';
// import warning from 'SRC_COMP/basic/BasicG6/asset/icon/node-icon-warning.svg';
// import information from 'SRC_COMP/basic/BasicG6/asset/icon/node-icon-information.svg';
// import normal from 'SRC_COMP/basic/BasicG6/asset/icon/node-icon-normal.svg';
// import notClassified from 'SRC_COMP/basic/BasicG6/asset/icon/node-icon-notClassified.svg';
// import { getHealthKeyByScore, getColorLevelByScore } from '@/config/health';

// const iconEnum = {
//   'disaster': disaster,
//   'critical': critical,
//   'average': average,
//   'warning': warning,
//   'information': information,
//   'normal': normal,
//   'notClassified': notClassified
// };

const initChainNode = (G6) => {
  G6.registerNode('callChainNode', {
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
    // setState(name, value, item) {
    //     const group = item.getContainer()
    //     const shape = group.get('children')[0]
    //     console.log(shape, 'group')
    //     // if (name === 'selected') {
    //     //     if (value) {
    //     //         shape.attr('fill', 'red')
    //     //     } else {
    //     //         shape.arrt('fill', 'transparent')
    //     //     }
    //     // }
    // },
    draw(cfg, group) {
      const { width, height, cur, nodeName, serviceId, healthScore, anchors, isRoot } = cfg;
      const shape = group.addShape('rect', {
        attrs: {
          width,
          height,
          fill: '#FFFFFF',
          //stroke: 'transparent',
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
          y: -2,
          fill: 'red'
          // stroke: 'rgba(123,128,168,0.3)',
        },
        name: 'border-box'
      });
      group.addShape('text', {
        attrs: {
          textBaseline: 'top',
          text: 'zzw1994529',
          // text: fittingString(nodeName, 80, 12),
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
          text: '6666666666',
          // text: fittingString(serviceId, 120, 12),
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
  }, 'rect');
};
export default initChainNode;