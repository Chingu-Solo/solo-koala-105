import quotes from "./quotes.js";
/* import fonts from "./fonts.js"; */

/**
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

	/* let fontInfoContainer = document.createElement("div");
	let flexContainer = document.createElement("div");
	let fontName = document.createElement("h1");
	let categoryName = document.createElement("h2");
	let addIcon = document.createElement("i");
	let spanEditable = document.createElement("span");
	let randomNb = Math.floor(Math.random() * quotes.length);
	let randomQuote = quotes[randomNb];

	fontInfoContainer.classList.add("font-info");
	flexContainer.classList.add("flex");
	addIcon.classList.add("material-icons");
	addIcon.classList.add("add-font");

	if (fonts.added) addIcon.textContent = "remove_circle_outline";
	else addIcon.textContent = "add_circle_outline";

	spanEditable.classList.add("spanEditable");
	spanEditable.setAttribute("contenteditable", "true");
	spanEditable.textContent = `${randomQuote}`;
	spanEditable.style.fontFamily = fonts.family;
	fontName.textContent = fonts.family;
	fontName.style.fontFamily = fonts.family;

	fonts.variants
		? (categoryName.textContent = `${fonts.category}, ${fonts.variants.length} variants`)
		: "No variants";

	fontInfoContainer.appendChild(flexContainer);
	flexContainer.appendChild(fontName);
	flexContainer.appendChild(addIcon);
	fontInfoContainer.appendChild(categoryName);
	fontInfoContainer.appendChild(spanEditable);

	return fontInfoContainer; */
};

export default HTMLTemplate;
