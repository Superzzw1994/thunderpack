export interface flowProps {
  className?: string; // 容器类名
  height?: number; // 画布高度
  width?: number | string; // 画布宽度
  modes?: {
    [propName: string]: string[]
  }; // 画布模式
  getGraph?: (graph: Object) => void; // 获取 graph 实例的函数
  toolBars?: React.ReactElement; // 工具栏的ReactNode
  sideBar?: React.ReactElement; // 侧边栏的ReactNode
  wrapperClassName?: string; // 外层的className
  customCommands?: customCommand // 自定义commands
  data?: flowData,
  layout?: flowLayout,
  registerCustomNode?: (G6) => void,

  [propName: string]: any
}

type flowData = {
  nodes: [],
  edges?: [],
  combos?: []
}
type flowLayout = {
  [key: string]: unknown;
}
type commandLifeCycle = Promise<Object> | void

export interface command {
  name: string;
  shortcutCodes?: [];
  queue?: boolean;
  executeTimes?: number;
  commandWillExecute?: (...args) => commandLifeCycle;
  commandShouldExecute?: (...args) => boolean;
  execute?: (graph, ...args) => commandLifeCycle;
  commandDidExecuted?: (graph, ...args) => commandLifeCycle
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

export type chainNode = {
  id: string | number,
  pre: string | number,
  nextList: chainNode[],
  [propName: string]: any
}

export type graphBaseConfig = Partial<flowProps>