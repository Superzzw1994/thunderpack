import React from 'react';
import ReactDOM from 'react-dom';
import Flow from './components/flow';
import App from './components/App';
import './index.less';

const Root = () => {
  return (
    <div className={'rootWrapper'}>
      <Flow className={'flowWrapper'} />
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
