let app = {};

app.buttonModules = () => {
	const viewButton = document.getElementById('viewButton');
	const changeRoom = document.getElementById('changeRoom');
	const mainModule = document.getElementById('mainModule');
	const exitModule = document.getElementById('exitModule');
	const slideshow = document.getElementById('slideshowContainer');
	const mainImg = document.getElementById('mainImg');
	const doneButton = document.getElementById('complete');

	//toggles slideshow
	viewButton.addEventListener('click', () => {
		mainModule.classList.toggle('hidden');
		exitModule.classList.toggle('visible');
		slideshow.classList.toggle('visible');
		mainImg.classList.toggle('hidden');
	});
	//toggle main image again
	doneButton.addEventListener('click', () => {
		mainModule.classList.toggle('hidden');
		exitModule.classList.toggle('visible');
		slideshow.classList.toggle('visible');
		mainImg.classList.toggle('hidden');
	});
};

app.init = () => {
	app.buttonModules();
	app.slider();
	// app.slideshow();
};

app.init();
