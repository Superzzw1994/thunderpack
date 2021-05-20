import React, { forwardRef, PropsWithChildren } from 'react';
import PluginWrapper from './components/flow/components/PluginWrapper';

const SideBar = (props, ref) => {
  return <PluginWrapper className={'sideBar'} ref={ref}>
    <div className={'tool'} data-command={'zoomIn'}>1</div>
    <div className={'tool'} data-command={'zoomOut'}>2</div>
    <div className={'tool'} data-command={'resetZoom'}>3</div>
  </PluginWrapper>;
};

export default forwardRef<any, PropsWithChildren<object>>(SideBar);