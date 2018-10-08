import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import Hello from './components/Hello';
import './index.css';

// const element = (
// 	    <div>
// 	      <h1>Hello, world!</h1>
// 	      <h2>It is {new Date().toLocaleTimeString()}.</h2>
// 	    </div>
// 	  );

// ReactDOM.render(
// 	// <App />,
// 	element,
// 	// <Hello name="TypeScript" enthusiasmLevel={10} />,
//   document.getElementById('root') as HTMLElement
// );


function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
			<App />
			<Hello name="TypeScript" enthusiasmLevel={10} />,
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root') as HTMLElement
  );
}

setInterval(tick, 1000);
