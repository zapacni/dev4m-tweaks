function createFlair(text, color) {
	return `<span style="border: 2px solid ${color};border-radius: 10000px;padding: 2px 8px;font-size: 10px;">
${text}</span>`
.replace('\n', '');
}

const cls = '"fa d-icon d-icon-ban svg-icon svg-string"';
const site = '"http://www.w3.org/2000/svg"';
const title = '"Suspended"'
const style = '"color:#e45735 !important"'

const cls2 = '"fa d-icon d-icon-code svg-icon svg-string"';
const title2 = '"Extension Developer"'
const style2 = '"color:#009FFF !important"'

const cls3 = '"fa d-icon d-icon-arrow-up svg-icon svg-string"';
const title3 = '"Top Contributor"'
const style3 = '"color:#e7c300 !important"'

const cls4 = '"fa d-icon d-icon-users svg-icon svg-string"';
const title4 = '"Sage"'

const cls5 = '"fa d-icon d-icon-user-check svg-icon svg-string"';
const title5 = '"Editor"'

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
.replace('\n', ' '),

	extensiondev: `<span title=${title2}>
<svg class=${cls2} xmlns=${site} style=${style2}>
<use xlink:href="#code"></use></svg></span>`
.replace('\n', ' '),

	top: `<span title=${title3}>
<svg class=${cls3} xmlns=${site} style=${style3}>
<use xlink:href="#arrow-up"></use></svg></span>`
.replace('\n', ' '),

	sage: `<span title=${title4}>
<svg class=${cls4} xmlns=${site} style=${style3}>
<use xlink:href="#users"></use></svg></span>`
.replace('\n', ' '),

	editor: `<span title=${title5}>
<svg class=${cls5} xmlns=${site} style=${style3}>
<use xlink:href="#user-check"></use></svg></span>`
.replace('\n', ' '),
};
