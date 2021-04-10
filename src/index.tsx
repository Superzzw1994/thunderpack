import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'normalize.css/normalize.css';
import './index.scss';

const Root = () => {
	return (
		<div className={'rootWrapper'}>
			<App/>
		</div>
	);
};

ReactDOM.render(<Root/>, document.getElementById('root'));
