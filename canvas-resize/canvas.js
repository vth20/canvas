const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight

var c = canvas.getContext('2d');
/**
 * x, y, w, h
 */
let rectFunc = () => {
	c.fillStyle = 'rgba(255, 0, 0, 0.5)';
	c.fillRect(50, 50, 100, 200);
	c.fillRect(300, 100, 100, 100);
	c.fillRect(550, 150, 100, 200);
	console.log(c);
}
// line
/**
 * moveTo( x,y ) - xác định điểm bắt đầu của dòng
 * lineTo( x,y ) - xác định điểm kết thúc của dòng
 */
let lineFunc = () => {
	c.beginPath();
	c.moveTo(50, 300);
	c.lineTo(300, 100);
	c.lineTo(400, 300);
	c.strokeStyle = 'red';
	c.stroke()
}
// circle
let circleFunc = () => {
	c.beginPath() //tao line moi
	c.arc(300, 300, 30, 0, Math.PI * 2, false)
	c.stroke()
}
circleFunc()

function drawRect(xStart, yStart, xEnd, yEnd) {
	c.beginPath()
	c.rect(xStart, yStart, xEnd - xStart, yEnd - yStart);
	c.lineWidth = 5;
	c.strokeStyle = "black";
	c.stroke();
}

function drawRect(xStart, yStart, xEnd, yEnd) {
	c.fillRect(xStart, yStart, xEnd - xStart, yEnd - yStart);
}

let drawingRect = (xStart, yStart, xEnd, yEnd) => {
	requestAnimationFrame(drawRect);
	c.clearRect(0, 0, innerWidth, innerHeight)
	drawRect(xStart, yStart, xEnd, yEnd)
}

let drawing = false;
let start = {};
let end = {};

canvas.onmouseup = canvas.onmousemove = canvas.onmousedown = function (e) {
	switch (e.type) {
		case "mouseup":
			drawing = false;
			console.log('mouse up: ', end);
			break;

		case "mousemove":
			let e1 = e.pageX;
			let e2 = e.pageY;
			// console.log({e1, e2});
			if (drawing) {
				console.log('drawing');
				/**
				 * Ve tren man hinh hien tai
				*/
				end.x = e.pageX;
				end.y = e.pageY;
				drawingRect(start.x, start.y, end.x, end.y)
			}
			break;

		case "mousedown":
			drawing = true;
			start.x = e.pageX;
			start.y = e.pageY;
			console.log('mouse down: ', start);
			break;

		default:
			break;
	}
};

// auto render circle
let autoCircle = () => {
	for (let i = 0; i < 1000; i++) {
		let x = Math.random() * window.innerWidth;
		let y = Math.random() * window.innerHeight;
		c.beginPath();
		c.arc(x, y, 30, 0, Math.PI * 2, false);
		c.strokeStyle = 'red';
		c.stroke()
	}
}
let animationFunc = () => {
	c.beginPath();
	c.arc(200, 200, 30, 0, Math.PI * 2, false);
	c.strokeStyle = 'red';
	c.stroke()
}
// animationFunc()
let innerWidth = window.innerWidth
let innerHeight = window.innerHeight

function Circle(x, y, radius, dx, dy) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.draw = () => {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.strokeStyle = 'blue'
		c.stroke()
	}
	this.update = () => {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
		this.x += this.dx
		this.y += this.dy

		this.draw()
	}
}

const circleArray = []

for (let i = 0; i < 100; i++) {
	let radius = 30
	let x = Math.random() * (innerWidth - radius * 2) + radius
	let y = Math.random() * (innerHeight - radius * 2) + radius
	let dx = (Math.random() - 0.5) * 8;
	let dy = (Math.random() - 0.5) * 8;

	const circle = new Circle(x, y, radius, dx, dy)
	circleArray.push(circle)
}


let animate = () => {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight)
	circleArray.forEach(circle => {
		circle.update()
	})
}
animate()