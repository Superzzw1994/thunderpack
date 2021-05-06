import React, { forwardRef, PropsWithChildren, useEffect, useImperativeHandle, useRef } from 'react';

interface toolBarsWrapperProps {
  children: React.ReactNodeArray;
  className?: string;
  graph?: Object | null;

  [propName: string]: any
}

const ToolBarsWrapper = (props, ref) => {
  const { children, className, graph } = props;
  return <div className={className} ref={ref}>
    {
      React.Children.map(children, (child) => child)
    }
  </div>;
};

export default forwardRef<any, PropsWithChildren<toolBarsWrapperProps>>(ToolBarsWrapper);