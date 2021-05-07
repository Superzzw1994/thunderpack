import React, { forwardRef, PropsWithChildren, useEffect, useImperativeHandle, useRef } from 'react';
import { toolBarsWrapperProps } from '../types';

const ToolBarsWrapper = (props, ref) => {
  const { children, className, graph, detailEnums } = props;
  return <div className={className} ref={ref}>
    {
      React.Children.map(children, (child) => {
        const { props = {} } = child;
        const itemProps = detailEnums && detailEnums[props['data-command']] ? {
          ['data-detail']: JSON.stringify(detailEnums[props['data-command']])
        } : {};
        return React.cloneElement(child, {
          ...props,
          ...itemProps
        });
      })
    }
  </div>;
};

export default forwardRef<any, PropsWithChildren<toolBarsWrapperProps>>(ToolBarsWrapper);