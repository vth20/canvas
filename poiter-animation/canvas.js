const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
const circleArray = []
const colors = [
	{ r: 255, g: 71, b: 71 },
	{ r: 0, g: 206, b: 237 },
	{ r: 255, g: 255, b: 255 },
	{ r: 198, g: 120, b: 29 }
];

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
})

function now() {
	return new Date().getTime();
}

function Circle(x, y, radius, dx, dy, ttl, id) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.opacity = 1;
	this.shouldRemove = false;
	this.timeToLive = ttl;
	this.randomColor = Math.floor(Math.random() * colors.length);
	this.id = id;

	this.draw = () => {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.strokeStyle =
			'rgba(' +
			colors[this.randomColor].r +
			',' +
			colors[this.randomColor].g +
			',' +
			colors[this.randomColor].b +
			',' +
			this.opacity +
			')'
		c.fillStyle =
			'rgba(' +
			colors[this.randomColor].r +
			',' +
			colors[this.randomColor].g +
			',' +
			colors[this.randomColor].b +
			',' +
			this.opacity +
			')'
		// ttl ~ !sub_value
		this.opacity -= 1 / (ttl / 0.1)
		this.radius -= radius / (ttl / 0.1)
		if (this.radius < 0) {
			this.radius = 0
		}
		c.stroke()
		c.closePath()
	}
	this.update = () => {
		this.timeToLive -= 0.01
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
		this.x += this.dx
		this.y += this.dy
		if (this.checkTimeLive()) {
			this.remove()
		} else {
			this.draw();
		}
	}
	this.remove = () => {
		circleArray.splice(this.id, 1)
	}

	this.checkTimeLive = () => {
		return this.timeToLive <= 0
	}
}

let animate = () => {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight)
	circleArray.forEach(circle => {
		circle.update();
	})
}

canvas.onmousemove = (e) => {
	switch (e.type) {
		case "mousemove":
			let radius = 30;
			let x = e.pageX
			let y = e.pageY
			let dx = (Math.random() - 0.5) * 8;
			let dy = (Math.random() - 0.5) * 8;
			let ttl = 5;
			let id = circleArray.length;
			const circle = new Circle(x, y, radius, dx, dy, ttl, id)
			circleArray.push(circle)
			break;

		default:
			break;
	}
}
animate()