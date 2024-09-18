// Toggle the mobile menu and hamburger icon state
function toggleMenu() { 
    const menuLinks = document.querySelector(".menu-links");
    const hamburgerIcon = document.querySelector(".hamburger-icon");
    menuLinks.classList.toggle("open");
    hamburgerIcon.classList.toggle("open");
}

document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.wave-images-container');
    const floatingImages = imageContainer.querySelectorAll('.wave-image');
    const containerBounds = imageContainer.getBoundingClientRect();

    // Initialize image positions and velocities randomly
    floatingImages.forEach(image => {
        image.dataset.posX = Math.random() * (containerBounds.width - image.width); // Random initial X position
        image.dataset.posY = Math.random() * (containerBounds.height - image.height); // Random initial Y position
        image.dataset.velocityX = (Math.random() - 0.5) * 2; // Random velocity in X direction
        image.dataset.velocityY = (Math.random() - 0.5) * 2; // Random velocity in Y direction
    });

    // Function to move the images around the container
    function animateImages() {
        floatingImages.forEach(image => {
            let posX = parseFloat(image.dataset.posX);
            let posY = parseFloat(image.dataset.posY);
            let velocityX = parseFloat(image.dataset.velocityX);
            let velocityY = parseFloat(image.dataset.velocityY);

            // Update position based on current velocity
            posX += velocityX;
            posY += velocityY;

            // Bounce off container boundaries and reverse velocity if necessary
            if (posX <= 0 || posX >= containerBounds.width - image.width) {
                velocityX *= -1;
                posX = Math.max(0, Math.min(containerBounds.width - image.width, posX));
            }
            if (posY <= 0 || posY >= containerBounds.height - image.height) {
                velocityY *= -1;
                posY = Math.max(0, Math.min(containerBounds.height - image.height, posY));
            }

            // Apply a drag factor to gradually reduce the velocity
            const dragFactor = 0.99;
            velocityX *= dragFactor;
            velocityY *= dragFactor;

            // Ensure a minimum velocity to prevent images from stopping
            const minVelocity = 0.5;
            const currentVelocity = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
            if (currentVelocity < minVelocity) {
                const velocityScale = minVelocity / currentVelocity;
                velocityX *= velocityScale;
                velocityY *= velocityScale;
            }

            // Update position and velocity in dataset
            image.dataset.posX = posX;
            image.dataset.posY = posY;
            image.dataset.velocityX = velocityX;
            image.dataset.velocityY = velocityY;

            // Apply the updated position to the image using CSS transform
            image.style.transform = `translate(${posX}px, ${posY}px)`;
        });

        // Continuously call animateImages to keep the images moving
        requestAnimationFrame(animateImages);
    }

    // Start the animation
    animateImages();
});
