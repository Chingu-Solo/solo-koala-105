import Template from "./template.js";
import EventHandler from "./eventHandler.js";
import { config } from "../config.js";

class Fonts {
	constructor() {
		this.state = {
			fontsList: []
		};
	}

	getGFonts = async () => {
		const jsonFonts = await fetch(
			`https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${config.apiKey}`
		);
		try {
			const gFonts = await jsonFonts.json();
			for (let i = 0; i < 10; i++) {
				this.state.fontsList.push(gFonts.items[i]);
			}
			this.createFontContainer(this.state.fontsList);
			this.handleUrlFonts(this.state.fontsList);
		} catch (error) {
			console.log(error);
		}
	};

	createFontContainer = fontsList => {
		/* 		console.log(fontsList); */
		let gridList = document.querySelector(".grid-list");
		/* gridList.innerHTML = ""; */
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
