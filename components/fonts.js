import Template from "./template.js";
import EventHandler from "./eventHandler.js";
import { config } from "../config.js";

class Fonts {
	constructor() {
		this.state = {
			fontsList: [],
			stock: [],
			fontsListIndex: 0,
			incrementor: 10
		};
	}

	getGFonts = async () => {
		/* let { fontsList, fontsListIndex, incrementor } = this.state; */

		const jsonFonts = await fetch(
			`https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${config.apiKey}`
		);
		try {
			const gFonts = await jsonFonts.json();
			this.state.stock = gFonts;
			let fontsListLoaded = this.handleFontsLoad(gFonts);

			this.createFontContainer(fontsListLoaded);
			this.handleUrlFonts(fontsListLoaded);
		} catch (error) {
			console.log(error);
		}
	};

	handleFontsLoad = fonts => {
		let { fontsList, fontsListIndex, incrementor } = this.state;
		for (let i = fontsListIndex; i < fontsListIndex + incrementor; i++) {
			fontsList.push(fonts.items[i]);
		}
		this.state.fontsListIndex += incrementor;
		return fontsList;
	};

	createFontContainer = fontsList => {
		let gridList = document.querySelector(".grid-list");

		fontsList.forEach(fonts => {
			const templateFont = Template(fonts);
			gridList.appendChild(templateFont);
		});

		EventHandler();
	};

	handleUrlFonts = fontsList => {
		let apiURL = "https://fonts.googleapis.com/css?family=";
		let regexSpace = / /g;

		fontsList.map((fonts, i, arr) => {
			let { family: fontFamily } = fonts;
			fontFamily = fontFamily.replace(regexSpace, "+");
			i === 0
				? (apiURL += `${fontFamily}`)
				: i === arr.length - 1
				? (apiURL += `|${fontFamily}&display=swap`)
				: (apiURL += `|${fontFamily}`);
		});
		let linkUrl = document.createElement("link");
		linkUrl.setAttribute("href", `${apiURL}`);
		linkUrl.setAttribute("rel", "stylesheet");
		document.head.appendChild(linkUrl);
	};
}

const fonts = new Fonts();

export default fonts;
