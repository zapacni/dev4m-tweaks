import handleInput from './handleInput.js';

setInterval(() => {
	for (let editor of document.getElementsByClassName('d-editor-input')) handleInput(editor);
	for (let editor of document.getElementsByClassName('flag-message')) handleInput(editor);
}, 100);