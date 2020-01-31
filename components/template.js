import quotes from "./quotes.js";
/* import fonts from "./fonts.js"; */

/**
 * Create an HTML Template Element for each font container
 *
 * @param {Object} fonts Font object as it is return by Google Font API
 * @param {string} fonts.family Fonts family property
 * @param {string} fonts.category Fonts category property
 *
 */
const HTMLTemplate = fonts => {
	let gridList = document.querySelector(".grid-list");
	if ("content" in document.createElement("template")) {
		let randomNb = Math.floor(Math.random() * quotes.length);
		let randomQuote = quotes[randomNb];
		let templateFont = document.getElementById("template-font");
		let cloneTemplate = document.importNode(templateFont.content, true);
		let h1 = cloneTemplate.querySelector("h1");
		h1.textContent = fonts.family;
		h1.style.fontFamily = fonts.family;
		let h2 = cloneTemplate.querySelector("h2");
		fonts.variants
			? (h2.textContent = `${fonts.category}, ${fonts.variants.length} variants`)
			: "No variants";
		let span = cloneTemplate.querySelector("span");
		span.classList.add("spanEditable");
		span.setAttribute("contenteditable", "true");
		span.textContent = `${randomQuote}`;
		span.style.fontFamily = fonts.family;
		let i = cloneTemplate.querySelector("i");
		if (fonts.added) i.textContent = "remove_circle_outline";
		else i.textContent = "add_circle_outline";
		gridList.appendChild(cloneTemplate);
	}
};

export default HTMLTemplate;
