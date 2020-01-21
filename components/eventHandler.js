import fonts from "./fonts.js";
import Template from "./template.js";

const EventHandler = () => {
	console.log("launch");

	const togglethemeBtn = document.querySelector(".toggle-theme__btn");
	let toggleColor = false;
	const inputFontTyped = document.querySelector(".type-something__input");
	const spanEditable = document.querySelectorAll(".spanEditable");
	const searchFont = document.querySelectorAll(".search-font__input");
	const toggleViewBtn = document.querySelector(".toggle-view__btn");
	let fontInfoContainer = document.querySelectorAll(".font-info");
	const goToTop = document.getElementById("go-to-top");
	const head = document.getElementsByTagName("head")[0];
	const link = document.createElement("link");

	console.log(fontInfoContainer);

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
		console.log(fontInfoContainer);

		fontInfoContainer.forEach(fontInfo => {
			if (fontInfo.hasAttribute("wide")) fontInfo.removeAttribute("wide");
			else fontInfo.setAttribute("wide", "");
		});
	});
	/* toggleViewBtn.addEventListener("click", () => {
		for (let i = 0; i < fontInfoContainer.length; i++) {
			console.log(fontInfoContainer[i]);
			if (fontInfoContainer[i].hasAttribute("wide"))
				fontInfoContainer[i].removeAttribute("wide");
			else fontInfoContainer[i].setAttribute("wide", "");
		}
	}); */
	/* toggleViewBtn.addEventListener("click", () => {
		fonts.state.toggleWide = !fonts.state.toggleWide;
		Template(fonts.state.fontsList, fonts.state.toggleWide);
		console.log(fonts.state.toggleWide);
	}); */

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
		/* console.log(e.target.value); */

		const test = fonts.state.fontsList.filter(font =>
			font.family.toLowerCase().includes(e.target.value.toLowerCase())
		);
		/* console.log(test); */

		/* fonts.createFontContainer(test); */
	});

	// * Load fonts an scroll
	document.addEventListener("scroll", () => {
		let endPointScroll =
			0 + document.body.clientHeight - window.innerHeight - window.scrollY;
		if (endPointScroll < 200) {
			fonts.handleFontsLoad();
			fontInfoContainer = document.querySelectorAll(".font-info");
		}
	});
};

export default EventHandler;
