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

// bouton retour vers le haut
window.addEventListener('scroll', function () {
	const scrollPosition = window.scrollY;
	const scrollToTop = document.querySelector('.scroll-to-top');
	if (scrollPosition > 20) {
		scrollToTop.classList.add('show');
	} else {
		scrollToTop.classList.remove('show');
	}
});
