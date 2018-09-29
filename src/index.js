import _ from 'lodash';
import $ from 'jquery';
import foo from './foo';

function component() {
  // let element = document.createElement('div');
	let element = $('<div></div>')

  // Lodash, currently included via a script, is required for this line to work
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	element.html(_.join(['HI', 'YQY'], ' '))
	console.log('foo：',foo)
	console.log('foo（）：',foo(),'hhhhhh')
	return element.get(0);
	
}

document.body.appendChild(component());