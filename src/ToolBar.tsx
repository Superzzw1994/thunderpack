import React, { forwardRef, PropsWithChildren } from 'react';
import PluginWrapper from './components/flow/components/PluginWrapper';
import { Icon, Tooltip } from '@chaoswise/ui';

const ToolBar = (props, ref) => {
  return <PluginWrapper className={'toolBars'} ref={ref} detailEnums={{
    zoomIn: {
      type: 'original',
      multiple: 1.2,
      max: 10
    },
    zoomOut: {
      type: 'original',
      multiple: 1.2,
      max: 0.1
    }
  }}>
    <div className={'tool'} data-command={'zoomIn'}><Tooltip title={'放大'}><Icon type='zoom-in' /></Tooltip></div>
    <div className={'tool'} data-command={'zoomOut'}><Tooltip title={'缩小'}><Icon type='zoom-out' /></Tooltip></div>
    <div className={'tool'} data-command={'resetZoom'}><Tooltip title={'复位'}><Icon type='redo' /></Tooltip></div>
  </PluginWrapper>;
};

export default forwardRef<any, PropsWithChildren<object>>(ToolBar);