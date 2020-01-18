import Fonts from "./components/fonts.js";

let togglethemeBtn = document.querySelector(".toggle-theme__btn");
let toggleColor = false;
let inputFontTyped = document.querySelector(".type-something__input");
let spanEditable = document.querySelectorAll(".spanEditable");
let searchFont = document.querySelectorAll(".search-font__input");

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
		console.log(e.target.value.length === 0);

		if (e.target.value.length === 0) {
			for (let i = 0; i < spanEditable.length; i++) {
				spanEditable[i].textContent = "Write something";
			}
		} else {
			spanEditable[i].textContent = e.target.value;
		}
	}
});

searchFont.addEventListener("input", e => {});
