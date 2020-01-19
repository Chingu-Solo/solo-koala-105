const HTMLTemplate = fonts => {
	let fontInfoContainer = document.createElement("div");
	let flexContainer = document.createElement("div");
	let fontName = document.createElement("h1");
	let categoryName = document.createElement("h2");
	let addIcon = document.createElement("i");
	let spanEditable = document.createElement("span");

	fontInfoContainer.classList.add("font-info");
	/* fontInfoContainer.style.fontFamily = fonts.family; */
	flexContainer.classList.add("flex");
	addIcon.classList.add("material-icons");
	addIcon.textContent = "add_circle_outline";
	spanEditable.classList.add("spanEditable");
	spanEditable.setAttribute("contenteditable", "true");
	spanEditable.textContent = "Do u like my font style?";
	spanEditable.style.fontFamily = fonts.family;
	fontName.textContent = fonts.family;
	fontName.style.fontFamily = fonts.family;
	categoryName.textContent = `${fonts.category}, ${fonts.variants.length} variants`;

	fontInfoContainer.appendChild(flexContainer);
	flexContainer.appendChild(fontName);
	flexContainer.appendChild(addIcon);
	fontInfoContainer.appendChild(categoryName);
	fontInfoContainer.appendChild(spanEditable);

	return fontInfoContainer;
};

export default HTMLTemplate;
