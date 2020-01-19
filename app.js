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
		if (e.target.value.length === 0) {
			for (let i = 0; i < spanEditable.length; i++) {
				spanEditable[i].textContent = "Write something";
			}
		} else {
			spanEditable[i].textContent = e.target.value;
		}
	}
});

const fonts = new Fonts();
fonts.getGFonts();

/* Fonts.getGFonts(); */

/* const getGFonts = async () => {
	const jsonFonts = await fetch(
		"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAjfp0YTzzzGDEWaGuXoN4imwRA4bTSwrM "
	);
	const gFonts = await jsonFonts.json();
	
	console.log(gFonts.items[0]);
};

getGFonts(); */
