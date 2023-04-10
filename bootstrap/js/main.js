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

// navbar qui se ferme sur tel
function closeNav() {
	var navBar = document.getElementById('navbarResponsive');
	if (navBar.classList.contains('show')) {
		navBar.classList.remove('show');
	}
}

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

//
// element container-time dans la timeline qui apparaissent un par un
// Sélectionnez tous les éléments avec la classe "container-time"
const containerTimes = document.querySelectorAll('.container-time');

// Options pour l'Intersection Observer
const options = {
	rootMargin: '0px',
	threshold: 0.5,
};

// Créez une instance de l'Intersection Observer avec une fonction de callback
const observer = new IntersectionObserver(function (entries, observer) {
	entries.forEach((entry) => {
		// Si l'élément est dans la vue de l'utilisateur, ajoutez la classe "visible" à l'élément
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		}
	});
}, options);

// Pour chaque élément avec la classe "container-time", observez l'élément
containerTimes.forEach((containerTime) => {
	observer.observe(containerTime);
});

// // Sélectionnez l'élément h2 et ajoutez-lui un gestionnaire d'événements click
// document.getElementById('big-dayen').addEventListener('click', function () {
// 	// Sélectionnez l'élément loader et ajoutez-lui une classe pour l'afficher
// 	var loader = document.getElementById('loader');
// 	loader.classList.add('loader');

// 	// Attendez un certain temps avant de rediriger l'utilisateur
// 	setTimeout(function () {
// 		// Redirigez l'utilisateur vers la page souhaitée
// 		window.location.href = '/bootstrap/index.html';
// 	}, 2000); // Temps d'attente en millisecondes (2 secondes dans cet exemple)
// });
