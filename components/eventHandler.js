import fonts from "./fonts.js";
import quotes from "./quotes.js";

/* import Template from "./template.js"; */

const EventHandler = () => {
	let gridList = document.querySelector(".grid-list");

	const togglethemeBtn = document.querySelector(".toggle-theme__btn");
	let toggleColor = false;
	const toggleViewBtn = document.querySelector(".toggle-view__btn");

	const inputFontTyped = document.querySelector(".type-something__input");
	let spanEditable = document.querySelectorAll(".spanEditable");
	const searchFont = document.querySelector(".search-font__input");

	let fontInfoContainer = document.querySelectorAll(".font-info");
	const goToTop = document.getElementById("go-to-top");

	const changeFontSize = document.querySelector(".change-font-size");
	const changeFontSizeBtn = document.querySelector(".change-font-size__btn");
	let fontsSizeOptions = document.querySelectorAll(".font-size-option");
	const refreshBtn = document.querySelector(".refresh__btn");

	let addFonts = document.querySelectorAll(".add-font");

	/* const head = document.getElementsByTagName("head")[0];
	const link = document.createElement("link"); */
	/* const changeFontSize = document.querySelector(".down-arrow"); */

	const refreshDOM = () => {
		fontInfoContainer = document.querySelectorAll(".font-info");
		spanEditable = document.querySelectorAll(".spanEditable");
		addFonts = document.querySelectorAll(".add-font");
	};

	// *-----* Font size handler *-----* //

	// * Loop over font size button to fire a click event listener on each of them and update the font size in each spanEditable
	for (let fontSizeOption of fontsSizeOptions) {
		fontSizeOption.addEventListener("click", e => {
			changeFontSizeBtn.textContent = `${e.target.textContent}px`;
			for (let s of spanEditable) {
				s.style.fontSize = `${e.target.textContent}px`;
			}
		});
	}

	// *  Initialize button text-contentand spanEditable font size
	changeFontSizeBtn.textContent = "40px";
	const initFontSize = () => {
		refreshDOM();
		for (let s of spanEditable) {
			s.style.fontSize = `${changeFontSizeBtn.textContent}`;
		}
	};
	initFontSize();

	// * Display the fonts size choice on click event
	changeFontSize.addEventListener("click", () => {
		document.querySelector(".show-size").style.display === "block"
			? (document.querySelector(".show-size").style.display = "none")
			: (document.querySelector(".show-size").style.display = "block");
	});

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

	const addFontsOnLocalStorage = () => {
		for (let addFont of addFonts) {
			addFont.addEventListener("click", e => {
				let retrieveFontFamily = e.target.previousSibling.innerHTML;
				fonts.storeFont(retrieveFontFamily);
			});
		}
	};
	addFontsOnLocalStorage();

	togglethemeBtn.addEventListener("click", () => {
		const body = document.body;
		if (toggleColor) {
			body.removeAttribute("black");
		} else {
			body.setAttribute("black", "");
		}
		toggleColor = !toggleColor;
	});

	const getRandomQuotes = () => {
		let randomNb = Math.floor(Math.random() * quotes.length);
		return quotes[randomNb];
	};

	inputFontTyped.addEventListener("input", e => {
		spanEditable = document.querySelectorAll(".spanEditable");
		for (let i = 0; i < spanEditable.length; i++) {
			if (e.target.value.length === 0) {
				spanEditable[i].textContent = `${getRandomQuotes()}`;
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
				if (inputFontTyped.value.length > 0) {
					for (let s of spanEditable) {
						s.textContent = inputFontTyped.value;
					}
				}
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
				if (inputFontTyped.value.length > 0) {
					for (let s of spanEditable) {
						s.textContent = inputFontTyped.value;
					}
				}
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
			addFontsOnLocalStorage();
		}
	});
};

export default EventHandler;
