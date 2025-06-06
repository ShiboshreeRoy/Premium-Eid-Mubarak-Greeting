// Particle system for background
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const particles = [];
const particleCount = Math.min(150, Math.floor(canvasWidth * canvasHeight / 5000));

class Particle {
	constructor() {
		this.x = Math.random() * canvasWidth;
		this.y = Math.random() * canvasHeight;
		this.size = Math.random() * 2 + 1;
		this.speedX = Math.random() * 1 - 0.5;
		this.speedY = Math.random() * 1 - 0.5;
		this.color = `rgba(255, 215, 0, ${Math.random() * 0.4 + 0.1})`;
	}

	update() {
		this.x += this.speedX;
		this.y += this.speedY;

		if (this.x > canvasWidth || this.x < 0) this.speedX *= -1;
		if (this.y > canvasHeight || this.y < 0) this.speedY *= -1;
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

function initParticles() {
	particles.length = 0;
	for (let i = 0; i < particleCount; i++) {
		particles.push(new Particle());
	}
}

function animateParticles() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	for (let i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].draw();

		// Draw connections between particles
		for (let j = i; j < particles.length; j++) {
			const dx = particles[i].x - particles[j].x;
			const dy = particles[i].y - particles[j].y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < 100) {
				ctx.beginPath();
				ctx.strokeStyle = `rgba(255, 215, 0, ${0.1 * (1 - distance/100)})`;
				ctx.lineWidth = 0.3;
				ctx.moveTo(particles[i].x, particles[i].y);
				ctx.lineTo(particles[j].x, particles[j].y);
				ctx.stroke();
			}
		}
	}

	requestAnimationFrame(animateParticles);
}

// Create stars
const starsContainer = document.getElementById('stars-container');
const starCount = 150;

for (let i = 0; i < starCount; i++) {
	const star = document.createElement('div');
	star.classList.add('star');

	// Random properties for each star
	const size = Math.random() * 2 + 1;
	const posX = Math.random() * 100;
	const posY = Math.random() * 100;
	const duration = Math.random() * 3 + 1;
	const delay = Math.random() * 5;

	star.style.width = `${size}px`;
	star.style.height = `${size}px`;
	star.style.left = `${posX}%`;
	star.style.top = `${posY}%`;
	star.style.setProperty('--duration', `${duration}s`);
	star.style.animationDelay = `${delay}s`;

	starsContainer.appendChild(star);
}

// Button interactions
const wishBtn = document.getElementById('wish-btn');
const shareBtn = document.getElementById('share-btn');
const card = document.querySelector('.card');
const menuBtn = document.getElementById('menu-btn');

wishBtn.addEventListener('click', () => {
	wishBtn.innerHTML = '<i class="fas fa-check"></i> Wishes Sent!';
	wishBtn.style.background = 'linear-gradient(45deg, #4CAF50, #2E7D32)';

	// Create floating hearts
	createFloatingHearts();

	// Card animation
	card.style.transform = 'rotateY(10deg) rotateX(8deg) translateY(-20px)';
	setTimeout(() => {
		card.style.transform = 'rotateY(5deg) rotateX(5deg) translateY(-15px)';
	}, 600);

	setTimeout(() => {
		wishBtn.innerHTML = '<i class="fas fa-gift"></i> Send Eid Wishes';
		wishBtn.style.background = 'linear-gradient(45deg, #ffd700, #ff9800)';
	}, 3000);
});

shareBtn.addEventListener('click', () => {
	shareBtn.innerHTML = '<i class="fas fa-check"></i> Copied Link!';
	shareBtn.style.background = 'linear-gradient(45deg, #9c27b0, #7b1fa2)';

	// Card animation
	card.style.transform = 'rotateY(-10deg) rotateX(8deg) translateY(-20px)';
	setTimeout(() => {
		card.style.transform = 'rotateY(5deg) rotateX(5deg) translateY(-15px)';
	}, 600);

	// Copy link to clipboard
	navigator.clipboard.writeText(window.location.href);

	setTimeout(() => {
		shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share Greetings';
		shareBtn.style.background = 'linear-gradient(45deg, #4a69bd, #1e3799)';
	}, 3000);
});

// Create floating hearts animation
function createFloatingHearts() {
	const container = document.querySelector('.container');
	const heartCount = 15;

	for (let i = 0; i < heartCount; i++) {
		const heart = document.createElement('div');
		heart.innerHTML = '<i class="fas fa-heart"></i>';
		heart.style.position = 'absolute';
		heart.style.color = `hsl(${Math.random() * 60 + 0}, 100%, 70%)`;
		heart.style.fontSize = `${Math.random() * 20 + 15}px`;
		heart.style.left = `${Math.random() * 100}%`;
		heart.style.bottom = '0';
		heart.style.opacity = '0';
		heart.style.zIndex = '10';
		heart.style.filter = `blur(${Math.random() * 2}px)`;

		container.appendChild(heart);

		// Animate the heart
		const animation = heart.animate([{
				bottom: '0',
				opacity: 0,
				transform: 'scale(0.5) translateZ(0)'
			},
			{
				opacity: 1,
				transform: 'scale(1.1) translateZ(20px)'
			},
			{
				bottom: '80%',
				opacity: 0,
				transform: 'scale(0.7) translateZ(40px)'
			}
		], {
			duration: Math.random() * 2000 + 3000,
			easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
		});

		animation.onfinish = () => heart.remove();
	}
}

// Parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
	if (window.innerWidth > 768) {
		const x = (window.innerWidth / 2 - e.clientX) / 30;
		const y = (window.innerHeight / 2 - e.clientY) / 30;

		card.style.transform = `rotateY(${x}deg) rotateX(${y}deg) translateY(-15px)`;
	}
});

// Mobile menu button
menuBtn.addEventListener('click', () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});

// Initialize and animate particles
function handleResize() {
	canvasWidth = window.innerWidth;
	canvasHeight = window.innerHeight;
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	initParticles();
}

window.addEventListener('resize', handleResize);

// Initialize
initParticles();
animateParticles();