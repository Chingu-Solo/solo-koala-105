import Template from "./template.js";
import EventHandler from "./eventHandler.js";
import { config } from "../config.js";

class Fonts {
	constructor() {
		this.state = {
			fontsList: [],
			/* templateFonts: [], */
			stock: [],
			fontsListIndex: 0,
			incrementor: 5,
			apiURL: ["https://fonts.googleapis.com/css?family="],
			finalURL: [],
			toggleWide: false
		};
	}

	getGFonts = async () => {
		this.state.fontsList = [];
		this.state.fontsListIndex = 0;
		let gridList = document.querySelector(".grid-list");
		gridList.innerHTML = "";
		const jsonFonts = await fetch(
			`https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${config.apiKey}`
		);
		try {
			const gFonts = await jsonFonts.json();
			this.state.stock = gFonts;
			await this.handleFontsLoad();
		} catch (error) {
			console.log(error);
		}
		await EventHandler();

		console.log("apicalls");
	};

	handleFontsLoad = newFontsResearch => {
		if (newFontsResearch) {
			let { fontsList, fontsListIndex, incrementor, stock } = this.state;

			fontsList.push(newFontsResearch);
			this.createFontContainer(newFontsResearch);
			this.handleUrlFonts(newFontsResearch);

			this.state.fontsListIndex += incrementor;
			this.createURL();
		} else {
			let { fontsList, fontsListIndex, incrementor, stock } = this.state;

			for (let i = fontsListIndex; i < fontsListIndex + incrementor; i++) {
				/* console.log(stock.items[i]); */
				fontsList.push(stock.items[i]);
				this.createFontContainer(stock.items[i]);
				this.handleUrlFonts(stock.items[i]);
			}
			/* console.log(fontsList, stock); */

			this.state.fontsListIndex += incrementor;
			this.createURL();
		}

		/* return fontsList; */
	};

	createFontContainer = (font, search) => {
		/* console.log(font); */

		let gridList = document.querySelector(".grid-list");
		if (search) {
			gridList.innerHTML = "";

			for (let f of font) {
				const templateFont = Template(f, this.state.toggleWide);

				gridList.appendChild(templateFont);
			}
		} else {
			console.log(font);

			const templateFont = Template(font, this.state.toggleWide);

			/* this.state.templateFonts.push(templateFont); */
			gridList.appendChild(templateFont);
		}
	};

	handleUrlFonts = fontsList => {
		let regexSpace = / /g;
		let formattedFont = fontsList.family.replace(regexSpace, "+");
		this.state.apiURL.push(formattedFont);
	};

	createURL = () => {
		/* console.log(this.state.apiURL); */

		this.state.finalURL = [];
		this.state.apiURL.map((name, index, arr) => {
			index === 0 || index === 1
				? this.state.finalURL.push(name)
				: index === arr.length - 1
				? this.state.finalURL.push(`|${name}&display=swap`)
				: this.state.finalURL.push(`|${name}`);
		});

		let finalURL = this.state.finalURL.join("");
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
