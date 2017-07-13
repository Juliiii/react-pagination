import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Pagination from './components/Pagination';
import registerServiceWorker from './registerServiceWorker';


let element = document.createElement('div');
document.body.appendChild(element);
ReactDOM.render(<Pagination />, element);
// registerServiceWorker();

