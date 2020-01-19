import fonts from "./fonts.js";

const EventHandler = () => {
	const togglethemeBtn = document.querySelector(".toggle-theme__btn");
	let toggleColor = false;
	const inputFontTyped = document.querySelector(".type-something__input");
	const spanEditable = document.querySelectorAll(".spanEditable");
	const searchFont = document.querySelectorAll(".search-font__input");
	const toggleViewBtn = document.querySelector(".toggle-view__btn");
	const fontInfoContainer = document.querySelectorAll(".font-info");
	const goToTop = document.getElementById("go-to-top");
	const head = document.getElementsByTagName("head")[0];
	const link = document.createElement("link");

	togglethemeBtn.addEventListener("click", () => {
		const body = document.body;
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
		scrollToTop();
	});

	const scrollToTop = () => {
		const c = document.documentElement.scrollTop || document.body.scrollTop;
		if (c > 0) {
			window.requestAnimationFrame(scrollToTop);
			window.scrollTo(0, c - c / 7);
		}
	};

	searchFont[0].addEventListener("input", e => {
		console.log(e.target.value);
		/* console.log(fonts.state.fontsList); */
		const test = fonts.state.fontsList.filter(font =>
			font.family.toLowerCase().includes(e.target.value.toLowerCase())
		);
		console.log(test);

		/* fonts.createFontContainer(test); */
	});
};

export default EventHandler;
