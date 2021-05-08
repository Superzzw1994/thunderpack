import React, { forwardRef, PropsWithChildren } from 'react';
import ToolBarsWrapper from './components/flow/components/ToolBarsWrapper';

const ToolBar = (props, ref) => {
  return <ToolBarsWrapper name={'zzw'} className={'toolBars'} ref={ref} detailEnums={{
    undo: {
      name: 123
    }
  }}>
    <div data-command={'undo'}>撤回</div>
    <div data-command={'add'}>添加</div>
  </ToolBarsWrapper>;
};

export default forwardRef<any, PropsWithChildren<object>>(ToolBar);