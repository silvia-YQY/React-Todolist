import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
// import Hello from './components/Hello';
import './index.css';

const element = (
	<div>
		<App />
	</div>
);

ReactDOM.render(
	element,
	document.getElementById('root') as HTMLElement
);
