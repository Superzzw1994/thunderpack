import {patchRouter, turnApp} from './index.js';

export const rewriteRouter = () => {
	window.history.pushState = patchRouter(window.history.pushState, 'micro_push');
	window.history.replaceState = patchRouter(window.history.pushState, 'micro_replace');
	// window.addEventListener('hashchange', function (e) {
	// 	console.log(789);
	// });
	window.addEventListener('micro_push', turnApp);
	window.addEventListener('micro_replace', turnApp);
	// 监听返回事件
	window.onpopstate = async function () {
		await turnApp();
	};
};
