import Template from "./template.js";
import EventHandler from "./eventHandler.js";
import { config } from "../config.js";

class Fonts {
	constructor() {
		(this.fontsList = []),
			(this.stock = []),
			(this.fontsListIndex = 0),
			(this.fontsListIndexOnScroll = 0),
			(this.incrementor = 15),
			(this.apiURL = ["https://fonts.googleapis.com/css?family="]),
			(this.research = false),
			(this.gridList = document.querySelector(".grid-list")),
			(this.localStorageFont = []),
			(this.finalURL = []);
	}

	getGFonts = async () => {
		const jsonFonts = await fetch(
			`https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${config.apiKey}`
		);
		try {
			const gFonts = await jsonFonts.json();
			this.stock = gFonts;
			await this.handleFontsLoad();
		} catch (error) {
			console.log(error);
		}
		await EventHandler();
	};

	storeFont = font => {
		if (localStorage.getItem("fonts")) {
			let getFontFromLocalStorage = JSON.parse(localStorage.getItem("fonts"));
			if (getFontFromLocalStorage.includes(font)) return;
			getFontFromLocalStorage.push(font);
			localStorage.setItem("fonts", JSON.stringify(getFontFromLocalStorage));
		} else {
			this.localStorageFont.push(font);
			localStorage.setItem("fonts", JSON.stringify(this.localStorageFont));
		}
	};

	removeFont = font => {
		let getFontFromLocalStorage = JSON.parse(localStorage.getItem("fonts"));

		getFontFromLocalStorage.map((f, i) => {
			if (f === font) {
				getFontFromLocalStorage.splice(i, 1);
				this.stock.items.map(ft => {
					if (ft.family === f) delete ft.added;
				});
			}
		});
		localStorage.setItem("fonts", JSON.stringify(getFontFromLocalStorage));
	};

	getFontFromLocalStorage = () => {
		let getFontFromLocalStorage = localStorage.getItem("fonts");

		for (let f of JSON.parse(getFontFromLocalStorage)) {
			this.stock.items.map((el, i) => {
				if (el.family === f) {
					this.stock.items.splice(i, 1);
					el.added = "added";
					this.stock.items.splice(0, 0, el);
				}
			});
		}
	};

	handleFontsLoad = newFontsResearch => {
		if (newFontsResearch === "scroll") {
			this.setUpFonts(this.fontsListIndexOnScroll, this.incrementor, true);
		} else if (newFontsResearch) {
			this.research = true;
			this.handleContainerAndURL(newFontsResearch);
			this.setUpFonts(this.fontsListIndex, this.incrementor, false);
		} else {
			/* console.log(this.fontsList); */
			if (localStorage.fonts && localStorage.fonts.length > 0) {
				this.getFontFromLocalStorage();
			}
			this.setUpFonts(this.fontsListIndex, this.incrementor, true);
		}
	};

	setUpFonts = (fontListIndex, incrementor, bool) => {
		bool
			? this.loopOverFontList(fontListIndex, incrementor)
			: (fontListIndex += incrementor);
		this.fontsListIndexOnScroll += incrementor;
		this.createURL();
	};

	loopOverFontList = (fontListIndex, incrementor) => {
		for (let i = fontListIndex; i < fontListIndex + incrementor; i++) {
			this.handleContainerAndURL(this.stock.items[i]);
		}
	};

	handleContainerAndURL = fontItem => {
		this.fontsList.push(fontItem);
		this.createFontContainer(fontItem);
		this.handleUrlFonts(fontItem);
	};

	refresh() {
		this.fontsList = [];
		this.fontsListIndex = 0;
		this.gridList.innerHTML = "";
		this.fontsListIndexOnScroll = 0;
		this.incrementor = 15;
		window.scrollTo(0, 0);
		if (localStorage.fonts && localStorage.fonts.length > 0) {
			this.getFontFromLocalStorage();
		}
		this.setUpFonts(this.fontsListIndex, this.incrementor, true);

		this.createURL();
	}

	createFontContainer = (font, search) => {
		if (search) {
			this.gridList.innerHTML = "";
			for (let f of font) {
				const templateFont = Template(f);
				this.gridList.appendChild(templateFont);
			}
		} else {
			const templateFont = Template(font);
			this.gridList.appendChild(templateFont);
		}
	};

	handleUrlFonts = fontsList => {
		let regexSpace = / /g;
		let formattedFont = fontsList.family.replace(regexSpace, "+");
		this.apiURL.push(formattedFont);
	};

	createURL = () => {
		this.finalURL = [];
		this.apiURL.map((name, index, arr) => {
			index === 0 || index === 1
				? this.finalURL.push(name)
				: index === arr.length - 1
				? this.finalURL.push(`|${name}&display=swap`)
				: this.finalURL.push(`|${name}`);
		});

		let finalURL = this.finalURL.join("");
		let linkUrl = document.createElement("link");
		linkUrl.setAttribute("href", `${finalURL}`);
		linkUrl.setAttribute("rel", "stylesheet");
		linkUrl.setAttribute("id", "fonts-url");

		let HTMLlink = document.getElementById("fonts-url");

		if (HTMLlink) {
			HTMLlink.remove();
			document.head.appendChild(linkUrl);
		} else document.head.appendChild(linkUrl);
	};
}

const fonts = new Fonts();

export default fonts;
