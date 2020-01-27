import quotes from "./quotes.js";
/* import fonts from "./fonts.js"; */

const HTMLTemplate = fonts => {
	let fontInfoContainer = document.createElement("div");
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

	return fontInfoContainer;
};

export default HTMLTemplate;
