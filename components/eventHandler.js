const EventHandler = () => {
	let togglethemeBtn = document.querySelector(".toggle-theme__btn");
	let toggleColor = false;
	let inputFontTyped = document.querySelector(".type-something__input");
	let spanEditable = document.querySelectorAll(".spanEditable");
	let searchFont = document.querySelectorAll(".search-font__input");
	let toggleViewBtn = document.querySelector(".toggle-view__btn");
	let fontInfoContainer = document.querySelectorAll(".font-info");
	let goToTop = document.getElementById("go-to-top");

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

	console.log(window);

	window.onscroll = () => {
		onScroll();
	};

	const onScroll = () => {
		let toolbar = document.querySelector(".global-toolbar");
		if (
			document.body.scrollTop > 20 ||
			document.documentElement.scrollTop > 20
		) {
			goToTop.style.display = "block";
			toolbar.setAttribute("fixed-nav", "");
			/* toolbar.style.position = "fixed"; */
		} else {
			goToTop.style.display = "none";
			toolbar.removeAttribute("fixed-nav");
			/* toolbar.style.position = "relative"; */
		}
	};

	goToTop.addEventListener("click", () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	});
};

export default EventHandler;
