import Template from "./template.js";
import EventHandler from "./eventHandler.js";
import { config } from "../config.js";

console.log(config.apiKey);

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
}

const fonts = new Fonts();

export default fonts;
