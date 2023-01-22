let app = {};

app.buttonModules = () => {
	// all variables that are needed to hide or show full screen mode
	const viewButton = document.getElementById('viewButton');
	const changeButton = document.getElementById('changeRoom');
	const exitButton = document.getElementById('mainExitButton');
	const mainModule = document.getElementById('mainModule');
	const exitModule = document.getElementById('exitModule');
	const slideshow = document.getElementById('slideshowContainer');
	const doneButton = document.getElementById('complete');
	const body = document.body;

	//button module array to have them all do the same thing since I thought they were roughly similiar
	const buttonArray = [viewButton, changeButton, exitButton];

	//selecting all the slides
	const slides = document.querySelectorAll('.slide');
	//empty string which changes depending on what the observer is viewing
	let img = '';
	//observer looks for what is currently in the viewport
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(
			(entry) => {
				if (entry.isIntersecting) {
					// body.style.backgroundImage;
					img = `url(${entry.target.firstElementChild.attributes[0].nodeValue})`;
				}
			},
			{ threshold: 1, rootMargin: '-200px' }
		);
	});
	//attaches an observer to each slide to indicate whether it is in the viewport
	slides.forEach((child) => {
		observer.observe(child);
	});

	//scroll function to move the slideshow
	const scroll = () => {
		const scrollContainer = document.querySelector('.slider');
		scrollContainer.addEventListener('wheel', (e) => {
			e.preventDefault();
			scrollContainer.scrollLeft += e.deltaY / 2;
		});
	};
	//buttons to hide the main image and show the slide show
	buttonArray.forEach((button) => {
		button.addEventListener('click', () => {
			mainModule.classList.toggle('hidden');
			exitModule.classList.toggle('visible');
			slideshow.classList.toggle('visible');
			body.style.backgroundImage = 'none';
			body.classList.toggle('grey');
			scroll();
		});
	});

	//removes the slider and goes to main feature
	doneButton.addEventListener('click', () => {
		mainModule.classList.toggle('hidden');
		exitModule.classList.toggle('visible');
		slideshow.classList.toggle('visible');
		body.classList.toggle('grey');
		body.style.backgroundImage = `${img}`;
	});
};

//function to duplicate a slide and add another one on to it
app.duplicateSlide = () => {
	const duplicate = document.querySelectorAll('.duplicate');
	const slideshow = document.querySelector('.innerSlider');
	duplicate.forEach((double) => {
		double.addEventListener('click', (e) => {
			const imageSRC =
				double.parentNode.parentElement.parentElement.firstElementChild
					.attributes[0].nodeValue;
			const heading =
				double.parentNode.parentElement.firstElementChild.children[0].innerText;
			const paragraph =
				double.parentNode.parentElement.firstElementChild.children[1].innerText;
			const newDuplicate = document.createElement('div');
			newDuplicate.className = 'slide';
			newDuplicate.innerHTML = `
						<img
							src="${imageSRC}"
							alt="yellow Chair"
							draggable="false"
						/>
						<div class="infoCard">
							<div class="info">
								<h1>${heading}</h1>
								<p>${paragraph}</p>
							</div>
							<div class="infoButtons">
								<button><i class="ph-share-network"></i>Share</button>
								<button><i class="ph-heart"></i>Favorite</button>
								<button class="duplicate"><i class="ph-copy"></i>Duplicate</button>
							</div>
						</div>
					`;
			slideshow.appendChild(newDuplicate);
			alert('Your Slide is added');
		});
	});
};

//works but you have to refresh page, still working on this
app.addFile = async () => {
	const slideshow = document.querySelector('.innerSlider');
	const input = document.getElementById('file');
	const file = input.files[0];
	if (!file) {
		alert('Please Upload a File');
		console.error('No file was selected');
		return;
	}

	//creating a URL object for the file
	const ImgSrc = await new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});

	const alt = file.name;
	const newSlide = document.createElement('div');
	newSlide.className = 'slide';
	newSlide.innerHTML = `
						<img
							src="${ImgSrc}"
							alt="${alt}"
							draggable="false"
						/>
						<div class="infoCard">
							<div class="info">
								<h1>${alt}</h1>
								
							</div>
							<div class="infoButtons">
								<button><i class="ph-share-network"></i>Share</button>
								<button><i class="ph-heart"></i>Favorite</button>
								<button class="duplicate"><i class="ph-copy"></i>Duplicate</button>
							</div>
						</div>
					`;
	slideshow.appendChild(newSlide);
};

app.init = () => {
	app.buttonModules();
	app.duplicateSlide();
	app.addFile();
};

app.init();
