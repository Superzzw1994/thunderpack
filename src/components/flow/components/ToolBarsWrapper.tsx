import React, { Fragment } from 'react';

interface toolBarsWrapperProps {
  children: React.ReactNodeArray;
  className?: string;
}

const ToolBarsWrapper: React.FC<toolBarsWrapperProps> = (props) => {
  const { children, className } = props;
  return <div className={className}>
    {
      React.Children.map(children, (child) => child)
    }
  </div>;
};

export default ToolBarsWrapper;