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
		console.log(this.state.fontsList);
	};
}

export default Fonts;
