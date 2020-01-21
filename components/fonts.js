import Template from "./template.js";
import EventHandler from "./eventHandler.js";
import { config } from "../config.js";

class Fonts {
	constructor() {
		this.state = {
			fontsList: [],
			stock: [],
			fontsListIndex: 0,
			incrementor: 10,
			apiURL: ["https://fonts.googleapis.com/css?family="],
			finalURL: []
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
			this.handleFontsLoad();
			/* let fontsListLoaded = this.handleFontsLoad(gFonts); */
			/* this.createFontContainer(fontsListLoaded);
			this.handleUrlFonts(fontsListLoaded); */

			/* this.createFontContainer(); */
			/* this.handleUrlFonts(); */
		} catch (error) {
			console.log(error);
		}
	};

	handleFontsLoad = () => {
		let { fontsList, fontsListIndex, incrementor, stock } = this.state;
		console.log(stock, fontsList);

		for (let i = fontsListIndex; i < fontsListIndex + incrementor; i++) {
			fontsList.push(stock.items[i]);
			this.createFontContainer(stock.items[i]);
			this.handleUrlFonts(stock.items[i]);
		}
		this.state.fontsListIndex += incrementor;
		this.createURL();
		/* return fontsList; */
	};

	createFontContainer = font => {
		let gridList = document.querySelector(".grid-list");
		const templateFont = Template(font);
		gridList.appendChild(templateFont);

		/* 	let { fontsList, fontsListIndex, incrementor, stock } = this.state;
		let gridList = document.querySelector(".grid-list");

		fontsList.forEach(fonts => {
			const templateFont = Template(fonts);
			gridList.appendChild(templateFont);
		}); */

		EventHandler();
	};

	handleUrlFonts = fontsList => {
		/* let apiURL = "https://fonts.googleapis.com/css?family="; */
		let regexSpace = / /g;
		let test = fontsList.family.replace(regexSpace, "+");
		this.state.apiURL.push(test);
		/* this.state.apiURL += `${test}`; */
		/* fontsList.map((fonts, i, arr) => {
			let { family: fontFamily } = fonts;
			fontFamily = fontFamily.replace(regexSpace, "+");
			i === 0
				? (apiURL += `${fontFamily}`)
				: i === arr.length - 1
				? (apiURL += `|${fontFamily}&display=swap`)
				: (apiURL += `|${fontFamily}`);
		}); */
		/* console.log(this.state.apiURL); */

		/* let linkUrl = document.createElement("link");
		linkUrl.setAttribute("href", `${this.state.apiURL}`);
		linkUrl.setAttribute("rel", "stylesheet");
		document.head.appendChild(linkUrl); */
	};

	createURL = () => {
		this.state.finalURL = [];
		this.state.apiURL.map((name, index, arr) => {
			index === 0 || index === 1
				? this.state.finalURL.push(name)
				: index === arr.length - 1
				? this.state.finalURL.push(`|${name}&display=swap`)
				: this.state.finalURL.push(`|${name}`);
		});

		let fontsURL = this.state.finalURL.join("");
		let linkUrl = document.createElement("link");
		linkUrl.setAttribute("href", `${fontsURL}`);
		linkUrl.setAttribute("rel", "stylesheet");
		linkUrl.setAttribute("id", "fonts-url");

		let HTMLlink = document.getElementById("fonts-url");
		/* console.log(HTMLlink); */

		if (HTMLlink) {
			HTMLlink.remove();
			document.head.appendChild(linkUrl);
		} else document.head.appendChild(linkUrl);
	};
}

const fonts = new Fonts();

export default fonts;
