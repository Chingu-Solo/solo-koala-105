class Fonts {
	constructor() {
		this.state = {
			fontsList: []
		};
	}

	getGFonts = async () => {
		const jsonFonts = await fetch(
			"https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyAjfp0YTzzzGDEWaGuXoN4imwRA4bTSwrM "
		);
		const gFonts = await jsonFonts.json();
		for (let i = 0; i < 10; i++) {
			this.state.fontsList.push(gFonts.items[i]);
		}
		this.createFontContainer(this.state.fontsList);
	};

	createFontContainer = fontsList => {
		fontsList.forEach(fonts => {
			let gridList = document.querySelector(".grid-list");
			const temp = this.HTMLTemplate(fonts);
			gridList.appendChild(temp);
		});
		this.addEvent();
	};

	HTMLTemplate(fonts) {
		let fontInfoContainer = document.createElement("div");
		fontInfoContainer.classList.add("font-info");
		let flexContainer = document.createElement("div");
		flexContainer.classList.add("flex");
		let fontName = document.createElement("h1");
		let AuthorName = document.createElement("h2");
		let addIcon = document.createElement("i");
		addIcon.classList.add("material-icons");
		addIcon.textContent = "add_circle_outline";
		let spanEditable = document.createElement("span");
		spanEditable.classList.add("spanEditable");
		spanEditable.setAttribute("contenteditable", "true");
		spanEditable.textContent = "tqrt sqtqtq r qs ";
		fontName.textContent = fonts.family;
		fontInfoContainer.appendChild(flexContainer);
		flexContainer.appendChild(fontName);
		flexContainer.appendChild(addIcon);
		fontInfoContainer.appendChild(spanEditable);
		return fontInfoContainer;
	}

	addEvent = () => {
		let togglethemeBtn = document.querySelector(".toggle-theme__btn");
		let toggleColor = false;
		let inputFontTyped = document.querySelector(".type-something__input");
		let spanEditable = document.querySelectorAll(".spanEditable");
		let searchFont = document.querySelectorAll(".search-font__input");
		let toggleViewBtn = document.querySelector(".toggle-view__btn");
		let fontInfoContainer = document.querySelectorAll(".font-info");

		togglethemeBtn.addEventListener("click", () => {
			let body = document.body;
			if (toggleColor) {
				body.removeAttribute("black");
			} else {
				body.setAttribute("black", "");
			}
			toggleColor = !toggleColor;
		});

		inputFontTyped.addEventListener("input", e => {
			for (let i = 0; i < spanEditable.length; i++) {
				if (e.target.value.length === 0) {
					for (let i = 0; i < spanEditable.length; i++) {
						spanEditable[i].textContent = "Write something";
					}
				} else {
					spanEditable[i].textContent = e.target.value;
				}
			}
		});

		toggleViewBtn.addEventListener("click", () => {
			for (let i = 0; i < fontInfoContainer.length; i++) {
				if (fontInfoContainer[i].hasAttribute("wide"))
					fontInfoContainer[i].removeAttribute("wide");
				else fontInfoContainer[i].setAttribute("wide", "");
			}
		});
	};
	/* insertAfter = (newNode, referenceNode) => {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}; */
}

export default Fonts;
