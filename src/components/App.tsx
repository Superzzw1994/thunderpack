import React from 'react';
import logo from '../assets/logo.png';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';

const urlList = [
	{
		name: 'app1',
		url: '/app1'
	},
	{
		name: 'app2',
		url: '/app2'
	},
];
const App = () => {
	const {push} = useHistory();
	return (
		<div className={'page'}>
			{
				urlList.map(url => <Link key={url.name} to={url.url}>
					<div>{url.name}</div>
				</Link>)
			}
		</div>
	);
};
export default App;
