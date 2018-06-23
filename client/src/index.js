import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import getData from './HOC/getData';
import registerServiceWorker from './registerServiceWorker';

const AppWithData = getData(App);

ReactDOM.render(<AppWithData />, document.getElementById('root'));
registerServiceWorker();
