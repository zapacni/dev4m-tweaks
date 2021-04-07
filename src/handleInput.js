import emojis from './emojis.js';

export default function handleInput(editor) {
	editor.addEventListener('input', () => {
		editor.value = editor.value.replace(/:(.*?):/, (_, match) => {
			const emoji = emojis[match];
			return emoji ? `<img src="${emoji}" width=20 height=20 title=":${match}:">` : `:${match}:`;
		});
	});
}
