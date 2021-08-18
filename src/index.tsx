import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.less';
import {useLocation} from 'react-router';
import {HashRouter, BrowserRouter} from 'react-router-dom';
import {start, registerMicroApps} from './mrico/start';

registerMicroApps([
	{
		name: 'app1',
		url: '/app1'
	},
	{
		name: 'app2',
		url: '/app2'
	},
], {
	beforeLoad: [() => {
		console.log('beforeLoad');
	}],
	mounted: [
		() => {
			console.log('mounted');
		}
	],
	destroy: [
		() => {
			console.log('destroy');
		}
	]
});
start();
const Root = () => {
	const {pathname} = useLocation();
	return (
		<div className={'rootWrapper'}>
			<App/>
		</div>
	);
};

ReactDOM.render(<BrowserRouter><Root/></BrowserRouter>, document.getElementById('root'));
