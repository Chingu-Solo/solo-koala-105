import Template from "./template.js";
import EventHandler from "./eventHandler.js";
import { config } from "../config.js";

/**
 * Create a Fonts object which handle and collect all fonts from google fonts API
 *
 * @example
 * let fonts = new Fonts();
 */
export class Fonts {
	/**
	 * @constructor
	 */
	constructor() {
		/**
		 * @type {Object}
		 */
		(this.fontsList = []),
			/**
			 * @type {Object}
			 */
			(this.stock = []),
			/**
			 * @type {Number}
			 */
			(this.fontsListIndex = 0),
			/**
			 * @type {Number}
			 */
			(this.fontsListIndexOnScroll = 0),
			/**
			 * @type {Number}
			 */
			(this.incrementor = 15),
			/**
			 * @type {string}
			 */
			(this.apiURL = ["https://fonts.googleapis.com/css?family="]),
			/**
			 * @type {boolean}
			 */
			(this.research = false),
			/**
			 * @type {Object}
			 */
			(this.gridList = document.querySelector(".grid-list")),
			/**
			 * @type {Object}
			 */
			(this.localStorageFont = []),
			/**
			 * @type {Object}
			 */
			(this.finalURL = []);
	}
	/**
	 *  Fetch the fonts from google fonts api and save theme in stock array property
	 *
	 */
	async getGFonts() {
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
	}

	/**
	 * Store font that has been clicked in localStorage
	 *
	 * @param {string} font Represents the font-family name
	 */
	storeFont(font) {
		if (localStorage.getItem("fonts")) {
			let getFontFromLocalStorage = JSON.parse(localStorage.getItem("fonts"));
			if (getFontFromLocalStorage.includes(font)) return;
			getFontFromLocalStorage.push(font);
			localStorage.setItem("fonts", JSON.stringify(getFontFromLocalStorage));
		} else {
			this.localStorageFont.push(font);
			localStorage.setItem("fonts", JSON.stringify(this.localStorageFont));
		}
	}

	/**
	 * Remove font from localStorage and update it in stock as well to handle state of add/remove button
	 *
	 * @param {string} font Represents the font-family name
	 */
	removeFont(font) {
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
	}

	/**
	 *  Handle the display of saved fonts by getting the fonts from localStorage and placing them at the begining of the stock array property making shure there is no doublon
	 */
	getFontFromLocalStorage() {
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
	}

	/**
	 *  Handle fonts load according to the parameter: scroll, value of input search or the initial loading fonts
	 *
	 * @param {string} newFontsResearch Represents either "scroll" or input search result
	 */
	handleFontsLoad(newFontsResearch) {
		if (newFontsResearch === "scroll") {
			this.setUpFonts(this.fontsListIndexOnScroll, this.incrementor, true);
		} else if (newFontsResearch) {
			this.research = true;
			this.handleContainerAndURL(newFontsResearch);
			this.setUpFonts(this.fontsListIndex, this.incrementor, false);
		} else {
			if (localStorage.fonts && localStorage.fonts.length > 0) {
				this.getFontFromLocalStorage();
			}
			this.setUpFonts(this.fontsListIndex, this.incrementor, true);
		}
	}

	/**
	 * Handle the loads of fonts according to the boolean value: if false, each new fonts from research
	 *
	 * @param {number} fontListIndex Respresents the index of iteration through the font list
	 * @param {number} incrementor Represent the number that increment the {@link fontListIndex}
	 * @param {boolean} bool Represent the boolean that indicate how to handle the iteration if either search is: an initial loading fonts, a scroll or an input search
	 */
	setUpFonts(fontListIndex, incrementor, bool) {
		bool
			? this.loopOverFontList(fontListIndex, incrementor)
			: (fontListIndex += incrementor);
		this.fontsListIndexOnScroll += incrementor;
		this.createURL();
	}

	/**
	 *
	 * @param {number} fontListIndex Respresents the index of iteration through the font list
	 * @param {number} incrementor Represent the number that increment the {@link fontListIndex}
	 */
	loopOverFontList(fontListIndex, incrementor) {
		for (let i = fontListIndex; i < fontListIndex + incrementor; i++) {
			this.handleContainerAndURL(this.stock.items[i]);
		}
	}

	/**
	 *
	 * @param {Object} fontItem Object return from the google font API
	 */
	handleContainerAndURL(fontItem) {
		this.fontsList.push(fontItem);
		this.createFontContainer(fontItem);
		this.handleUrlFonts(fontItem);
	}

	/**
	 *  Refresh the page as if it was reloaded
	 */
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

	/**
	 * Create a font template for each fonts
	 *
	 * @param {Object} font Object return from the google font API
	 * @param {boolean} search Boolean to know if the query is from research or not
	 */
	createFontContainer(font, search) {
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
	}

	/**
	 *  Format each font name before creating an url
	 *
	 * @param {Object} fontsList Object return from the google font API
	 */
	handleUrlFonts(fontsList) {
		let regexSpace = / /g;
		let formattedFont = fontsList.family.replace(regexSpace, "+");
		this.apiURL.push(formattedFont);
	}

	/**
	 * Createand format a final url with all font name
	 */
	createURL() {
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
	}
}

let fonts = new Fonts();

export default fonts;
