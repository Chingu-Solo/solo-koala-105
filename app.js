import Fonts from "./components/fonts.js";

const fonts = new Fonts();
fonts.getGFonts();

/* let togglethemeBtn = document.querySelector(".toggle-theme__btn");
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
}); */
/* fonts.createFontContainer(); */
