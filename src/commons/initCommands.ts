import { customCommand } from '../components/flow/types';

export const initToolBarsCommand: customCommand = {
  toolBarClick: {
    name: 'toolBarClick',
    commandDidExecuted(graph, params) {
      console.log(params);
      // return Promise.resolve({});
    }
  }
};