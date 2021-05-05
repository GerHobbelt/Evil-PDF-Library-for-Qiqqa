
const fs = require('fs');
const path = require('path');

const filepath = process.argv[2].replace(/[\\]/g, '/').replace(/^\.\//, '');

let src = "";
if (fs.existsSync(".gitignore")) {
	src = fs.readFileSync(".gitignore", "utf8");
}
if (!src.includes(filepath)) {
	const header = "# large file split/unsplit support: ignoring the large files.";
	src = src.trim();
	if (!src.includes(header)) {
		src += `

${header}

		`;
	}
	src += '\n' + filepath + '\n';

	fs.writeFileSync(".gitignore", src, "utf8");
}

