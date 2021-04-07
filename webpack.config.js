const path = require("path");

module.exports = {
	mode: "production",
	entry: path.join(__dirname, "src", "index.js"),
	output: {
		filename: "dev4m-tweaks.js",
		path: __dirname,
	},
};
