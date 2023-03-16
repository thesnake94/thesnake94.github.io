// navbar qui bouge
window.onscroll = function () {
	if (window.innerWidth > 991) {
		if (window.pageYOffset > 100) {
			document.querySelector('nav').classList.add('sticky');
		} else {
			document.querySelector('nav').classList.remove('sticky');
		}
	}
};
