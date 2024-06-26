function toggleMenu() { 
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.wave-images-container');
    const images = container.querySelectorAll('.wave-image');
    const containerRect = container.getBoundingClientRect();

    let isMouseOver = false;

    // Track mouse position and hover state
    container.addEventListener('mousemove', (e) => {
        container.dataset.mouseX = e.clientX - containerRect.left;
        container.dataset.mouseY = e.clientY - containerRect.top;
    });
    container.addEventListener('mouseenter', () => isMouseOver = true);
    container.addEventListener('mouseleave', () => isMouseOver = false);

    // Initialize image positions and velocities
    images.forEach(img => {
        img.dataset.x = Math.random() * (containerRect.width - img.width);
        img.dataset.y = Math.random() * (containerRect.height - img.height);
        img.dataset.vx = (Math.random() - 0.5) * 2;
        img.dataset.vy = (Math.random() - 0.5) * 2;
    });

    function moveImages() {
        const mouseX = parseFloat(container.dataset.mouseX) || containerRect.width / 2;
        const mouseY = parseFloat(container.dataset.mouseY) || containerRect.height / 2;

        images.forEach(img => {
            let x = parseFloat(img.dataset.x);
            let y = parseFloat(img.dataset.y);
            let vx = parseFloat(img.dataset.vx);
            let vy = parseFloat(img.dataset.vy);

            if (isMouseOver) {
                // Calculate direction to mouse
                const dx = mouseX - x;
                const dy = mouseY - y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Move towards mouse, but maintain some distance
                const targetDistance = 100; // Distance to maintain from mouse
                const force = (distance - targetDistance) / 10000;
                vx += dx * force;
                vy += dy * force;
            } else {
                // Add small random acceleration when mouse is not over
                vx += (Math.random() - 0.5) * .01;
                vy += (Math.random() - 0.5) * .01;
            }

            // Apply velocity
            x += vx;
            y += vy;

            // Bounce off container walls
            if (x <= 0 || x >= containerRect.width - img.width) {
                vx *= -1;
                x = Math.max(0, Math.min(containerRect.width - img.width, x));
            }
            if (y <= 0 || y >= containerRect.height - img.height) {
                vy *= -1;
                y = Math.max(0, Math.min(containerRect.height - img.height, y));
            }

            // Apply drag
            const drag = isMouseOver ? 0.95 : 0.99;
            vx *= drag;
            vy *= drag;

            // Ensure minimum velocity
            const minVelocity = 0.5;
            const currentVelocity = Math.sqrt(vx * vx + vy * vy);
            if (currentVelocity < minVelocity) {
                const scale = minVelocity / currentVelocity;
                vx *= scale;
                vy *= scale;
            }

            // Update position and velocity
            img.dataset.x = x;
            img.dataset.y = y;
            img.dataset.vx = vx;
            img.dataset.vy = vy;

            img.style.transform = `translate(${x}px, ${y}px)`;
        });

        requestAnimationFrame(moveImages);
    }

    moveImages();
});