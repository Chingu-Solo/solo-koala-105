import fonts from "./components/fonts.js";

document.addEventListener("DOMContentLoaded", () => {
	fonts.getGFonts();
});
/* fonts.handleUrlFonts(); */
console.log(document.body.clientHeight, window.innerHeight, window.scrollY);
document.addEventListener("click", () => {
	let test =
		0 + document.body.clientHeight - window.innerHeight - window.scrollY;
	if (test < 200) {
		// Here it would go an ajax request
		/* $("body").append($(".item").clone()); */
		let d = document.querySelectorAll(".font-info");
		d.forEach(c => {
			console.log(c);

			document.querySelector(".grid-list").appendChild(c.cloneNode());
			/* .clone(); */
		});
	}
});
