import flairs from './flairs.js';

const OP_CLASS_NAME = '-!-has-op-flairs';
const USER_FLAIR_CLASS_NAME = '-!-has-user-flairs';

const userFlairs = {
	1311: 'bobox',
	112950: 'godefficients',
	34253: 'extensiondev',
	399427: 'extensioncont',
};

const topBadges = {
	102: 'top',
	103: 'sage',
	104: 'editor2',
};

const highlights = {
	'staff': ' moderator',
	'local': ' regular',
};

const postFlairs = { };
const topicFlairs = { };

const users = {
	tl0: [ ],
	tl1: [ ],
	tl2: [ ],
	tl3: [ ],
	tl4: [ ],
};

const trustLevels = [ 'visitor', 'member', 'regular', 'editor', 'leader' ];

let suspendedUsers = [ ];
let notSuspendedUsers = [ ];

let topUsers = {};
let notTopUsers = [ ];

const FETCH_CONFIG = {
	method: 'GET',
};

const CLASS_NAME = '-!--user-flaired ';
const CLASS_NAME2 = '-!--user-has-dm-bttn';

async function isSuspended(userId, post) {
	if (suspendedUsers.indexOf(userId) !== -1) return true;
	if (notSuspendedUsers.indexOf(userId) !== -1) return false;

	const res = await fetch(`https://devforum.roblox.com/u/${post.username}.json`, FETCH_CONFIG)
	if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

	const blob = await res.blob();
	const user = JSON.parse(await blob.text());

	if (user.user.suspended_till) {
		suspendedUsers.push(userId);
		return true;
	} else {
		notSuspendedUsers.push(userId);
		return false;
	}
};

async function hasTopBadge(userId, post) {
	if (topUsers[userId]) return topUsers[userId];
	if (notTopUsers.indexOf(userId) !== -1) return false;

	const res = await fetch(`https://devforum.roblox.com/u/${post.username}.json`, FETCH_CONFIG)
	if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

	const blob = await res.blob();
	const user = JSON.parse(await blob.text());
	const badges = [ ];

	Object.keys(user.badges).forEach(function (key) {
		if (topBadges[user.badges[key].id]) {
			if (!badges[user.badges[key].id]) {
				badges.push(user.badges[key].id);
			};	
		};
	 });

	if (badges.length !== 0) { 
		var largest = Math.max.apply(Math, badges);

		if (largest) {
			topUsers[userId] = [topBadges[largest]];
		return(topBadges[largest])
		}
	} else {
		notTopUsers.push(userId);
		return false
	}
};

async function getUserInfo(userId, postId) {
	const info = { };

	for (let i = 0; i < 5; i++) {
		if (users[`tl${i}`].indexOf(userId) !== -1) {
			info.trustLevel = trustLevels[i];
			break;
		}
	}

	const res = await fetch(`https://devforum.roblox.com/posts/${postId}.json`, FETCH_CONFIG);

	if (!res.ok) {
		console.log(res.statusText);
		return { error: res };
	}

	const blob = await res.blob();
	const user = JSON.parse(await blob.text());

	users[`tl${user.trust_level}`].push(userId);
	info.trustLevel = trustLevels[user.trust_level];
	info.userInfo = user;

	return info;
};

async function handlePost(post) {
	if (post.classList.contains(CLASS_NAME)) return;
	if (post.classList.contains(CLASS_NAME2)) return;

	post.className += ` ${CLASS_NAME}`;
	post.className += ` ${CLASS_NAME2}`;

	const a = post.getAttribute('data-user-id');
	const b = post.getAttribute('data-post-id');

	if (b === null) return;

	const { trustLevel, userInfo } = await getUserInfo(
		a,
		b
	).catch(console.log);

	let isUserSuspended = false;
	let TopBadge;

	if (userInfo) isUserSuspended = await isSuspended(
		post.getAttribute('data-user-id'),
		userInfo
	).catch(console.log);

	if (userInfo) TopBadge = await hasTopBadge(
		post.getAttribute('data-user-id'),
		userInfo
	).catch(console.log);

	if (trustLevel) addFlair(post, trustLevel);
	if (TopBadge) addFlair(post, TopBadge);
	if (isUserSuspended) addFlair(post, 'suspended');

	if (!userInfo.yours) {
		addDirectMessage(post, userInfo.username)
	} else {
		addHighlight(post, "local")
	};

	if (post.parentElement.classList.contains("group-Roblox_Staff")) {
		addHighlight(post, "staff")
	};
};

function getChild(element, className) {
	for (const child of element.childNodes) {
		if (child.classList.contains(className)) return child;
	}
	return null;
};

function addDirectMessage(post, username) {
	let body;

	for (let row of post.getElementsByClassName('row')) {
		body = getChild(row, "topic-body");
		if (body) break;
	}

	const regular = getChild(body, 'regular');
	const menu = getChild(regular, 'post-menu-area');
	const controls = getChild(menu, 'post-controls');
	const actions = getChild(controls, 'actions');

	var button = document.createElement("button");
	button.classList.add("widget-button","btn-flat","envelope","no-text","btn-icon");
	button.title = "message post author"
	button.innerHTML += `<svg class="fa d-icon d-icon-envelope svg-icon svg-node d-hover" xmlns="http://www.w3.org/2000/svg">
	<use xlink:href="#envelope"></use></svg>`.replace('\n', ' ');

	actions.appendChild(button)

	addMsgEvent(button, username)
};

function addMsgEvent(b, u) {
	b.addEventListener('click', function() {
		window.location.href = `http://devforum.roblox.com/new-message?username=${u}`;
	}, false)
};

function addHighlight(post, type) {
	let body;

	for (let row of post.getElementsByClassName('row')) {
		body = getChild(row, "topic-body");
		if (body) break;
	}

	const regular = getChild(body, 'regular');
	const cooked = getChild(regular, 'cooked');

	if (type == "staff") {
		if (post.parentElement.classList.contains("moderator")) return;
		post.parentElement.className += " moderator";
	};

	if (type == "local") {
		cooked.style.background = 'var(--tertiary-very-low)'
	};
};

function addFlair(post, flair) {
	const actualFlair = flairs[flair];
	let body;

	for (let row of post.getElementsByClassName('row')) {
		body = getChild(row, "topic-body");
		if (body) break;
	}

	const meta = getChild(body, 'topic-meta-data');
	const names = getChild(meta, 'names');
	names.innerHTML += actualFlair;
};

function handleOP(post) {
	if (!post.parentElement.classList.contains('topic-owner')) return;
	if (post.classList.contains(OP_CLASS_NAME)) return;

	addFlair(post, 'op');
	post.className += ` ${OP_CLASS_NAME}`;
};

function handleUserFlairs(post) {
	if (post.classList.contains(USER_FLAIR_CLASS_NAME)) return;

	const userId = post.getAttribute('data-user-id');
	const postId = post.getAttribute('data-post-id');
	const topicId = post.getAttribute('data-topic-id');

	if (userFlairs[userId]) addFlair(post, userFlairs[userId]);
	if (postFlairs[postId]) addFlair(post, postFlairs[postId]);
	if (topicFlairs[topicId]) addFlair(post, topicFlairs[topicId]);

	post.className += ` ${USER_FLAIR_CLASS_NAME}`;
};

export default function handleFlairs(post) {
	handleOP(post);
	handlePost(post);
	handleUserFlairs(post);
};
