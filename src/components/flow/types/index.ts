import React from 'react';

export interface flowProps {
  className?: string; // 容器类名
  height?: number; // 画布高度
  width?: number | string; // 画布宽度
  mode?: 'default' | 'view' | 'edit'; // 画布模式
  getGraph?: (graph: Object) => void; // 获取 graph 实例的函数
  toolBars?: React.ReactElement // 工具栏的ReactNode
}


export interface customCommand {
  [propName: string]: (...args) => void;
}

export interface commands {
  initPlugin: (graph, commands?: customCommand) => void;

  [propName: string]: any;
}

export interface toolBarsWrapperProps {
  children: React.ReactNodeArray;
  className?: string;
  graph?: Object | null;
  detailEnums?: Object;

  [propName: string]: any
}