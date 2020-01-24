import fonts from "./fonts.js";
import Template from "./template.js";

const EventHandler = () => {
	const togglethemeBtn = document.querySelector(".toggle-theme__btn");
	let toggleColor = false;
	const inputFontTyped = document.querySelector(".type-something__input");
	let spanEditable = document.querySelectorAll(".spanEditable");
	const searchFont = document.querySelector(".search-font__input");
	const toggleViewBtn = document.querySelector(".toggle-view__btn");
	let fontInfoContainer = document.querySelectorAll(".font-info");
	const goToTop = document.getElementById("go-to-top");
	const head = document.getElementsByTagName("head")[0];
	const link = document.createElement("link");
	const changeFontSize = document.querySelector(".change-font-size");
	const changeFontSizeBtn = document.querySelector(".change-font-size__btn");
	/* const changeFontSize = document.querySelector(".down-arrow"); */
	const refreshBtn = document.querySelector(".refresh__btn");
	let fontsSizeOptions = document.querySelectorAll(".font-size-option");
	let gridList = document.querySelector(".grid-list");

	const refreshDOM = () => {
		fontInfoContainer = document.querySelectorAll(".font-info");
		spanEditable = document.querySelectorAll(".spanEditable");
	};

	for (let fontSizeOption of fontsSizeOptions) {
		fontSizeOption.addEventListener("click", e => {
			changeFontSizeBtn.textContent = `${e.target.textContent}px`;
			for (let s of spanEditable) {
				s.style.fontSize = `${e.target.textContent}px`;
			}
		});
	}

	changeFontSizeBtn.textContent = "40px";
	const initFontSize = () => {
		refreshDOM();

		for (let s of spanEditable) {
			s.style.fontSize = `${changeFontSizeBtn.textContent}`;
		}
	};
	initFontSize();

	// * refresh page with refresh button as if it was reloaded
	refreshBtn.addEventListener("click", () => {
		if (document.body.hasAttribute("black"))
			document.body.removeAttribute("black");
		if (gridList.hasAttribute("wide")) gridList.removeAttribute("wide");
		fonts.refresh();
		changeFontSizeBtn.textContent = "40px";
		initFontSize();
		fonts.fontsListIndexOnScroll = 5;
		searchFont.value = "";
		inputFontTyped.value = "";
		fonts.research = false;
	});

	changeFontSize.addEventListener("click", () => {
		document.querySelector(".show-size").style.display === "block"
			? (document.querySelector(".show-size").style.display = "none")
			: (document.querySelector(".show-size").style.display = "block");
	});

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
		spanEditable = document.querySelectorAll(".spanEditable");
		for (let i = 0; i < spanEditable.length; i++) {
			if (e.target.value.length === 0) {
				spanEditable[i].textContent = "Try my font by writing something";
			} else {
				spanEditable[i].textContent = e.target.value;
			}
		}
	});

	toggleViewBtn.addEventListener("click", () => {
		gridList.hasAttribute("wide")
			? gridList.removeAttribute("wide")
			: gridList.setAttribute("wide", "");
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
		} else {
			goToTop.style.display = "none";
			toolbar.removeAttribute("fixed-nav");
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

	let timerId;
	searchFont.addEventListener("input", e => {
		var debounceFunction = function(func, delay) {
			// Cancels the setTimeout method execution
			clearTimeout(timerId);

			// Executes the func after delay time.
			timerId = setTimeout(func, delay);
		};

		function makeAPICall() {
			if (e.target.value.length === 0) {
				fonts.refresh();
				refreshDOM();
				initFontSize();
				fonts.research = false;
				console.log(fonts.research);
			} else {
				const filterFonts = fonts.stock.items.filter((
					font // or fonts.stock.items.filter
				) => font.family.toLowerCase().includes(e.target.value.toLowerCase()));
				for (let filterFont of filterFonts) {
					fonts.handleFontsLoad(filterFont);
				}

				let search = true;
				fonts.createFontContainer(filterFonts, search);
				initFontSize();
			}
			fonts.fontsListIndexOnScroll = 5;
		}

		// Debounces makeAPICall method
		debounceFunction(makeAPICall, 2000);
	});

	// * Load fonts an scroll
	document.addEventListener("scroll", e => {
		if (fonts.research === true) return;

		let endPointScroll =
			0 + document.body.clientHeight - window.innerHeight - window.scrollY;
		if (endPointScroll === 0) return;
		if (endPointScroll < 200) {
			fonts.handleFontsLoad("scroll");
			refreshDOM();
			initFontSize();
			if (inputFontTyped.value.length > 0) {
				for (let s of spanEditable) {
					s.textContent = inputFontTyped.value;
				}
			}
		}
	});
};

export default EventHandler;
