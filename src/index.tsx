import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import '../src/assets/main.css';
import './index.less';

const Root = () => {
  return (
    <div className={'rootWrapper bottom-16 bg-red'}>
      <App />
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
