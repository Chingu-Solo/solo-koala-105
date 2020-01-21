import fonts from "./components/fonts.js";

document.addEventListener("DOMContentLoaded", async () => {
	await fonts.getGFonts();
	/* fonts.handleUrlFonts(); */
});
