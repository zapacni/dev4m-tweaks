function createFlair(text, color) {
	return `<span style="border: 2px solid ${color};border-radius: 10000px;padding: 2px 8px;font-size: 10px;">
${text}</span>`
.replace('\n', '');
}

const cls = '"fa d-icon d-icon-ban svg-icon svg-string"';
const site = '"http://www.w3.org/2000/svg"';
const title = '"Suspended"'
const style = '"color:#e45735 !important"' // 4 vars are 2 keep it <120 columns

export default {
	op: createFlair('OP', 'green'),
	visitor: createFlair('VISITOR (TL0)', '#95A5A6'),
	member: createFlair('MEMBER (TL1)', '#68D1F1'),
	regular: createFlair('REGULAR (TL2)', '#4B9CFA'),
	editor: createFlair('EDITOR (TL3)', '#AC96EC'),
	leader: createFlair('LEADER (TL4)', '#D7C7FF'),
	bobox: createFlair('BOBUX MAN', '#00B7F6'),
	godefficients: createFlair('GODEFFICIENTS', '#8119d1'),

	suspended: `<span title=${title}>
<svg class=${cls} xmlns=${site} style=${style}>
<use xlink:href="#ban"></use></svg></span>`
.replace('\n', ' '), // this is just to keep it under 120 columns -_-
};
