export interface flowProps {
  className?: string; // 容器类名
  height?: number; // 画布高度
  width?: number | string; // 画布宽度
  mode?: 'default' | 'view' | 'edit'; // 画布模式
  getGraph?: (graph: Object) => void; // 获取 graph 实例的函数
  toolBars?: React.ReactElement; // 工具栏的ReactNode
  wrapperClassName?: string; // 外层的className
  customCommands?: customCommand // 自定义commands
}

export interface command {
  name: string;
  shortcutCodes?: [];
  queue?: boolean;
  executeTimes?: number;
  commandWillExecute?: (...args) => Promise<Object>;
  commandShouldExecute?: (...args) => boolean;
  execute: (graph, ...args) => Promise<Object>;
  commandDidExecuted?: (graph, ...args) => Promise<Object>
}

export interface customCommand {
  [propName: string]: command;
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