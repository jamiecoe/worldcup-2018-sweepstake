import React from 'react';
import ReactDOM from 'react-dom';

import App from './Components/App';
import getData from './HOC/getData';
import registerServiceWorker from './registerServiceWorker';
import './styles/globalStyling'

const AppWithData = getData(App, ['countries', 'players']);

ReactDOM.render(<AppWithData />, document.getElementById('root'));
registerServiceWorker();
