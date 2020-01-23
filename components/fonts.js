import Template from "./template.js";
import EventHandler from "./eventHandler.js";
import { config } from "../config.js";

class Fonts {
	constructor() {
		(this.fontsList = []),
			/* templateFonts: [], */
			(this.stock = []),
			(this.fontsListIndex = 0),
			(this.fontsListIndexOnScroll = 5),
			(this.incrementor = 5),
			(this.apiURL = ["https://fonts.googleapis.com/css?family="]),
			(this.finalURL = []),
			(this.toggleWide = false);
	}

	getGFonts = async () => {
		/* this.fontsList = [];
		this.fontsListIndex = 0;
		let gridList = document.querySelector(".grid-list");
		gridList.innerHTML = ""; */
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

		/* console.log("apicalls"); */
	};

	handleFontsLoad = newFontsResearch => {
		if (newFontsResearch === "scroll") {
			for (
				let i = this.fontsListIndexOnScroll;
				i < this.fontsListIndexOnScroll + this.incrementor;
				i++
			) {
				/* console.log(stock.items[i]); */
				this.fontsList.push(this.stock.items[i]);
				this.createFontContainer(this.stock.items[i]);
				this.handleUrlFonts(this.stock.items[i]);
			}
			/* console.log(fontsList, stock); */

			this.fontsListIndexOnScroll += this.incrementor;
			this.createURL();
		} else if (newFontsResearch) {
			let { fontsList, fontsListIndex, incrementor, stock } = this;

			fontsList.push(newFontsResearch);
			this.createFontContainer(newFontsResearch);
			this.handleUrlFonts(newFontsResearch);

			this.fontsListIndex += incrementor;
			this.createURL();
		} else {
			/* let { fontsList, fontsListIndex, incrementor, stock } = this; */

			for (
				let i = this.fontsListIndex;
				i < this.fontsListIndex + this.incrementor;
				i++
			) {
				/* console.log(stock.items[i]); */
				this.fontsList.push(this.stock.items[i]);
				this.createFontContainer(this.stock.items[i]);
				this.handleUrlFonts(this.stock.items[i]);
			}
			/* console.log(fontsList, stock); */

			this.fontsListIndex += this.incrementor;
			this.createURL();
		}

		/* return fontsList; */
	};

	refresh() {
		this.fontsList = [];
		this.fontsListIndex = 0;
		let gridList = document.querySelector(".grid-list");
		gridList.innerHTML = "";
		let { fontsList, fontsListIndex, incrementor, stock } = this;
		fontsListIndex = 0;
		for (let i = fontsListIndex; i < fontsListIndex + incrementor; i++) {
			/* console.log(stock.items[i]); */
			fontsList.push(stock.items[i]);
			this.createFontContainer(stock.items[i]);
			this.handleUrlFonts(stock.items[i]);
		}
		/* console.log(fontsList, stock); */

		/* fontsListIndex += incrementor; */
		this.createURL();
	}

	createFontContainer = (font, search) => {
		/* console.log(font); */

		let gridList = document.querySelector(".grid-list");
		if (search) {
			gridList.innerHTML = "";

			for (let f of font) {
				const templateFont = Template(f, this.toggleWide);

				gridList.appendChild(templateFont);
			}
		} else {
			/* console.log(font); */

			const templateFont = Template(font, this.toggleWide);

			/* this.templateFonts.push(templateFont); */
			gridList.appendChild(templateFont);
		}
	};

	handleUrlFonts = fontsList => {
		let regexSpace = / /g;
		let formattedFont = fontsList.family.replace(regexSpace, "+");
		this.apiURL.push(formattedFont);
	};

	createURL = () => {
		/* console.log(this.apiURL); */

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
