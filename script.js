let togglethemeBtn = document.querySelector(".toggle-theme__btn");

let toggleColor = false;

togglethemeBtn.addEventListener("click", () => {
	let body = document.body;
	if (toggleColor) {
		body.removeAttribute("black");
	} else {
		body.setAttribute("black", "");
	}
	toggleColor = !toggleColor;
});
