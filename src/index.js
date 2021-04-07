const emojis = {
	"AAA": "https://cdn.discordapp.com/emojis/626147013070684161.gif?v=1",
	"thonk_smile": "https://cdn.discordapp.com/emojis/451214432131874837.png?v=1",
	"flushing": "https://cdn.discordapp.com/emojis/808498786279882762.gif?v=1",
	"flusheando": "https://cdn.discordapp.com/emojis/808498786279882762.gif?v=1",
	"ice_cube_neutral": "https://cdn.discordapp.com/emojis/817498095959932993.png?v=1",
	"xdd": "https://cdn.discordapp.com/emojis/408457517832732675.png?v=1",
	"xd": "https://cdn.discordapp.com/emojis/408457388144853004.png?v=1",
	"bit_bobux": "https://cdn.discordapp.com/emojis/817483409324113930.png?v=1",
	"pensive_splash": "https://cdn.discordapp.com/emojis/591821888175603713.gif?v=1",
	"premium": "https://cdn.discordapp.com/emojis/614587108350492702.png?v=1"
}

function handleInput(editor) {
	editor.addEventListener('input', () => {
		editor.value = editor.value.replace(/:(.*?):/, (_, match) => {
			console.log(match);
			return emojis[match] ? `<img src="${emojis[match]}" width=20 height=20 title="${match}">` : match;
		});
	});
}

setInterval(() => {
	for (let editor of document.getElementsByClassName('d-editor-input')) handleInput(editor);
	for (let editor of document.getElementsByClassName('flag-message')) handleInput(editor);
}, 100);