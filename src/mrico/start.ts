import {rewriteRouter} from './utils/rewriteRouter';
import {getList, setList, getLifeCycle, setLifeCycle} from './const/subApp';
import {currentApp} from './utils';

rewriteRouter();

export const registerMicroApps = (appList, lifeCycle) => {
	setList(appList);
	setLifeCycle(lifeCycle);
};
export const start = () => {
	const appList = getList();
	if (!appList.length) {
		// 子应用列表为空
		throw Error('子应用列表为空， 请正确注册');
	}
	const app = currentApp();
	const {pathname, hash} = window.location;

	if (!hash) {
		// 当前没有在使用的子应用
		// 1. 抛出一个错误，请访问正确的连接
		// 2. 访问一个默认的路由，通常为首页或登录页面
		window.history.pushState(null, null, '/');
	}

	if (app && hash) {
		const url = pathname + hash;

		window['__CURRENT_SUB_APP__'] = app.url;

		window.history.pushState('', '', url);
	}
};
