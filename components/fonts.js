import Template from "./template.js";
import EventHandler from "./eventHandler.js";
import { config } from "../config.js";

class Fonts {
	constructor() {
		(this.fontsList = []),
			(this.stock = []),
			(this.fontsListIndex = 0),
			(this.fontsListIndexOnScroll = 5),
			(this.incrementor = 15),
			(this.apiURL = ["https://fonts.googleapis.com/css?family="]),
			(this.research = false),
			(this.gridList = document.querySelector(".grid-list")),
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

	handleFontsLoad = newFontsResearch => {
		if (newFontsResearch === "scroll") {
			this.setUpFonts(this.fontsListIndexOnScroll, this.incrementor);
		} else if (newFontsResearch) {
			this.research = true;
			this.handleContainerAndURL(newFontsResearch);
			this.fontsListIndex += this.incrementor;
			this.createURL();
		} else {
			this.setUpFonts(this.fontsListIndex, this.incrementor);
		}
	};

	setUpFonts = (fontListIndex, incrementor) => {
		this.loopOverFontList(fontListIndex, incrementor);
		fontListIndex += incrementor;
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
		this.fontsListIndex = 0;
		for (
			let i = this.fontsListIndex;
			i < this.fontsListIndex + this.incrementor;
			i++
		) {
			this.fontsList.push(this.stock.items[i]);
			this.createFontContainer(this.stock.items[i]);
			this.handleUrlFonts(this.stock.items[i]);
		}
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
