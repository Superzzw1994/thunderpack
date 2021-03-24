import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.less';

const Root = () => {
  return (
    <div className={'rootWrapper'}>
      <App />
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
