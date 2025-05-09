const markIn = document.getElementById("markdown-input");
const htmlOut = document.getElementById("html-output");
const preview = document.getElementById("preview");

// Block-level regex
const regexH1 = /^#{1}(?!#)\s*(.+)$/;
const regexH2 = /^#{2}(?!#)\s*(.+)$/;
const regexH3 = /^#{3}(?!#)\s*(.+)$/;
const regexQuote = /^>\s*(.+)$/;

// Inline-level regex
const regexBold = /\*\*(.+?)\*\*/g;
const regexItalic = /_(.+?)_/g;
const regexLink = /\[(.+?)\]\((.+?)\)/g;
const regexImage = /!\[(.*?)\]\((.+?)\)/g;

function applyInlineMarkdown(text) {
	return text
		.replace(regexImage, `<img alt="$1" src="$2">`)
		.replace(regexLink, `<a href="$2">$1</a>`)
		.replace(regexBold, `<strong>$1</strong>`)
		.replace(regexItalic, `<em>$1</em>`);
}

function convertMarkdown() {
	const markInVal = markIn.value;
	const lines = markInVal.split("\n");
	let html = "";

	for (let line of lines) {
		let convertedLine = applyInlineMarkdown(line);

		if (regexH1.test(line)) {
			let content = line.replace(regexH1, "$1");
			html += `<h1>${applyInlineMarkdown(content)}</h1>\n`;
		} else if (regexH2.test(line)) {
			let content = line.replace(regexH2, "$1");
			html += `<h2>${applyInlineMarkdown(content)}</h2>\n`;
		} else if (regexH3.test(line)) {
			let content = line.replace(regexH3, "$1");
			html += `<h3>${applyInlineMarkdown(content)}</h3>\n`;
		} else if (regexQuote.test(line)) {
			let content = line.replace(regexQuote, "$1");
			html += `<blockquote>${applyInlineMarkdown(
				content
			)}</blockquote>\n`;
		} else {
			html += `<p>${convertedLine}</p>\n`;
		}
	}

	htmlOut.textContent = html;
	preview.innerHTML = html;
}

markIn.addEventListener("input", convertMarkdown);
