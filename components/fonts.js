import Template from "./template.js";
import EventHandler from "./eventHandler.js";

class Fonts {
	constructor() {
		this.state = {
			fontsList: []
		};
	}

	getGFonts = async () => {
		const jsonFonts = await fetch(
			"https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyAjfp0YTzzzGDEWaGuXoN4imwRA4bTSwrM "
		);
		const gFonts = await jsonFonts.json();
		for (let i = 0; i < 10; i++) {
			this.state.fontsList.push(gFonts.items[i]);
		}
		this.createFontContainer(this.state.fontsList);
	};

	createFontContainer = fontsList => {
		fontsList.forEach(fonts => {
			let gridList = document.querySelector(".grid-list");
			const templateFont = Template(fonts);
			gridList.appendChild(templateFont);
		});
		EventHandler();
	};
}

export default Fonts;
