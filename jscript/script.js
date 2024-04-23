document.addEventListener("DOMContentLoaded", function () {
    // Add 'loaded' class to insidebackground when the page is loaded
    document.querySelector('.insidebackground').classList.add('loaded');
});

document.addEventListener("DOMContentLoaded", function () {
    const categoryButtons = document.querySelectorAll('.category-btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            filterProjects(category);
            setActiveButton(button);
        });
    });

    function filterProjects(category) {
        const projects = document.querySelectorAll('.project');
        projects.forEach(project => {
            const categories = project.getAttribute('data-category').split(' ');
            if (category === 'all' || categories.includes(category)) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }

    function setActiveButton(activeButton) {
        categoryButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
});
// JavaScript
document.addEventListener("DOMContentLoaded", function () {
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModalButton = document.querySelector('.close-modal');
    initializeSlideshows();

    // Function to open modal
    function openModal(content) {
        document.querySelector('.modal-content').innerHTML = content;
        modalOverlay.style.display = 'flex';
    }

    // Function to close modal
    function closeModal() {
        modalOverlay.style.display = 'none';
    }

    function handleKeyPress(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    // Close modal when close button is clicked
    closeModalButton.addEventListener('click', closeModal);

    // Open modal when a project is clicked
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('click', function () {
            const projectContent = this.innerHTML; // Adjust based on your project content structure
            openModal(projectContent);
        });
    });

    // Close modal when clicking outside of it
    modalOverlay.addEventListener('click', function (event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // Close modal when Escape key is pressed
    document.addEventListener('keydown', handleKeyPress);
});




document.addEventListener("DOMContentLoaded", function () {
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModalButton = document.querySelector('.close-modal');
    const prevSlideButton = document.querySelector('.prev-slide');
    const nextSlideButton = document.querySelector('.next-slide');

    let currentSlideIndex = 0;

    function openModal(content) {
        document.querySelector('.modal-content').innerHTML = content;
        modalOverlay.style.display = 'flex';
        initSlider();
    }

    function closeModal() {
        modalOverlay.style.display = 'none';
    }

    closeModalButton.addEventListener('click', closeModal);
    prevSlideButton.addEventListener('click', showPrevSlide);
    nextSlideButton.addEventListener('click', showNextSlide);

    const projects = document.querySelectorAll('.project');
    projects.forEach((project, index) => {
        project.addEventListener('click', function () {
            const projectContent = this.innerHTML;
            openModal(projectContent);
            currentSlideIndex = index;
        });
    });

    function initSlider() {
        const slides = document.querySelectorAll('.slider img');
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        slides[currentSlideIndex].style.display = 'block';
    }

    function showPrevSlide() {
        const slides = document.querySelectorAll('.slider img');
        slides[currentSlideIndex].style.display = 'none';
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        slides[currentSlideIndex].style.display = 'block';
    }

    function showNextSlide() {
        const slides = document.querySelectorAll('.slider img');
        slides[currentSlideIndex].style.display = 'none';
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[currentSlideIndex].style.display = 'block';
    }
});


/*Passions*/
// Function to initialize each slideshow independently
function initializeSlideshows() {
    // Get all slideshow containers
    const slideshowContainers = document.querySelectorAll('.slideshow-container');

    // Loop through each slideshow container
    slideshowContainers.forEach(function (container) {
        let slideIndex = 0;
        container.dataset.slideIndex = slideIndex; // Initialize slide index for this container
        const slides = container.querySelectorAll('.slide');
        const video = container.querySelector('video');

        // Initially, display the first slide and hide the rest
        showSlide(container, slideIndex);

        // Add event listeners to prev and next buttons
        container.querySelector('.prev').addEventListener('click', function () {
            prevSlide(container);
        });

        container.querySelector('.next').addEventListener('click', function () {
            nextSlide(container);

        });
    });
}

// Function to stop video playback within a specific slideshow container
function stopVideo(container) {
    const video = container.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0; // Reset video to beginning
    }
}

// Function to show previous slide within a container
function prevSlide(container) {
    let slideIndex = parseInt(container.dataset.slideIndex); // Get current slide index from dataset
    slideIndex = (slideIndex - 1 + container.querySelectorAll('.slide').length) % container.querySelectorAll('.slide').length; // Calculate previous slide index
    container.dataset.slideIndex = slideIndex; // Update dataset
    showSlide(container, slideIndex); // Display previous slide
    stopVideo(container); // Stop video playback
}

// Function to show next slide within a container
function nextSlide(container) {
    let slideIndex = parseInt(container.dataset.slideIndex); // Get current slide index from dataset
    slideIndex = (slideIndex + 1) % container.querySelectorAll('.slide').length; // Calculate next slide index
    container.dataset.slideIndex = slideIndex; // Update dataset
    showSlide(container, slideIndex); // Display next slide
    stopVideo(container); // Stop video playback
}


// Function to display a specific slide within a container
function showSlide(container, n) {
    const slides = container.querySelectorAll('.slide');
    const video = container.querySelector('video');

    // Hide all slides
    slides.forEach(function (slide) {
        slide.style.display = 'none';
    });

    // Hide video
    if (video) {
        video.style.display = 'none';
    }

    // Display the nth slide
    slides[n].style.display = 'block';

    // Display video if nth slide is video
    if (slides[n].tagName.toLowerCase() === 'video') {
        slides[n].style.display = 'block';
    }
}

// Call the initializeSlideshows function when the window loads
window.addEventListener('load', function () {
    // Initialize independent slideshows
    initializeSlideshows();

    // Get the height of the first image for each slideshow container
    document.querySelectorAll('.slideshow-container').forEach(function (container) {
        const firstImage = container.querySelector('.slide');
        const firstImageHeight = firstImage.offsetHeight;

        // Set the height of all images to match the height of the first image
        container.querySelectorAll('.slide').forEach(function (image) {
            image.style.height = firstImageHeight + 'px';

            // Calculate the aspect ratio and set the max-width accordingly
            const aspectRatio = image.naturalWidth / image.naturalHeight;
            const newWidth = firstImageHeight * aspectRatio;
            image.style.maxWidth = newWidth + 'px';
        });
    });
});


window.addEventListener('load', function () {
    // Iterate over each slideshow container
    document.querySelectorAll('.slideshow').forEach(function (container) {
        // Get the height of the first image within the container
        const firstImage = container.querySelector('.slide');
        const firstImageHeight = firstImage.offsetHeight;

        // Set the height of all images within the container to match the height of the first image
        container.querySelectorAll('.slide').forEach(function (image) {
            image.style.height = firstImageHeight + 'px';

            // Calculate the aspect ratio and set the max-width accordingly
            const aspectRatio = image.naturalWidth / image.naturalHeight;
            const newWidth = firstImageHeight * aspectRatio;
            image.style.maxWidth = newWidth + 'px';
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.style.display = 'none'; // Hide the modal overlay when the page loads
});
