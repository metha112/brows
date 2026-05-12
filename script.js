function openInvitation() {
    const cover = document.getElementById('cover');
    
    // Slide the cover up
    cover.classList.add('hide-cover');
    
    // Enable scrolling on the body after opening
    document.body.style.overflow = 'auto';
}

function openInvitation() {
    const cover = document.getElementById('cover');
    cover.classList.add('hide-cover');
    document.body.style.overflow = 'auto';
    
    // Start the heart rain
    initHeartRain();
}

function initHeartRain() {
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = [];
    const heartCount = 50;

    class Heart {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height; // Start above screen
            this.size = Math.random() * 15 + 10;
            this.speed = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.swing = Math.random() * 2; // Side to side movement
        }

        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`; // Gold hearts
            ctx.beginPath();
            const topCurveHeight = this.size * 0.3;
            ctx.moveTo(this.x, this.y + topCurveHeight);
            // Standard heart shape curve
            ctx.bezierCurveTo(this.x, this.y, this.x - this.size / 2, this.y, this.x - this.size / 2, this.y + topCurveHeight);
            ctx.bezierCurveTo(this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x, this.y + (this.size + topCurveHeight) / 2, this.x, this.y + this.size);
            ctx.bezierCurveTo(this.x, this.y + (this.size + topCurveHeight) / 2, this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x + this.size / 2, this.y + topCurveHeight);
            ctx.bezierCurveTo(this.x + this.size / 2, this.y, this.x, this.y, this.x, this.y + topCurveHeight);
            ctx.fill();
        }

        update() {
            this.y += this.speed;
            this.x += Math.sin(this.y / 30) * this.swing; // Gentle swaying
            if (this.y > canvas.height) {
                this.reset();
            }
        }
    }

    for (let i = 0; i < heartCount; i++) {
        hearts.push(new Heart());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// Handle window resize
window.addEventListener('resize', () => {
    const canvas = document.getElementById('heartCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});