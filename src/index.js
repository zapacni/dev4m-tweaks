import handleInput from './handleInput.js';
import handleFlairs from './handleFlairs.js';

setInterval(() => {
	for (let post of document.getElementsByTagName('article')) handleFlairs(post);
	for (let editor of document.getElementsByClassName('d-editor-input')) handleInput(editor);
	for (let editor of document.getElementsByClassName('flag-message')) handleInput(editor);
}, 1000);
