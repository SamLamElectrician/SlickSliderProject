let app = {};

app.buttonModules = () => {
	const viewButton = document.getElementById('viewButton');
	const changeRoom = document.getElementById('changeRoom');
	const mainModule = document.getElementById('mainModule');
	const exitModule = document.getElementById('exitModule');
	const slideshow = document.getElementById('slideshowContainer');
	const doneButton = document.getElementById('complete');
	const mainImg = document.getElementById('mainImg');
	const body = document.body;

	const innerSlider = document.getElementById('innerSlider');
	const slides = document.querySelectorAll('.slide');

	const scroll = () => {
		const scrollContainer = document.querySelector('.slider');

		scrollContainer.addEventListener('wheel', (e) => {
			e.preventDefault();
			scrollContainer.scrollLeft += e.deltaY;
		});
	};
	//toggles slideshow on and removes background image
	viewButton.addEventListener('click', () => {
		mainModule.classList.toggle('hidden');
		exitModule.classList.toggle('visible');
		slideshow.classList.toggle('visible');
		body.style.backgroundImage = 'none';
		body.classList.toggle('grey');
		scroll();
		// mainImg.classList.toggle('hidden');
	});

	//removes the slider and goes to main feature
	doneButton.addEventListener('click', () => {
		mainModule.classList.toggle('hidden');
		exitModule.classList.toggle('visible');
		slideshow.classList.toggle('visible');
		body.classList.toggle('grey');
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(
				(entry) => {
					if (entry.isIntersecting) {
						body.style.backgroundImage = `url(${entry.target.firstElementChild.attributes[0].nodeValue})`;
					}
				},
				{ threshold: 1 }
			);
		});

		slides.forEach((child) => {
			observer.observe(child);
		});
	});
};

app.init = () => {
	app.buttonModules();

	// app.slideshow();
};

app.init();
