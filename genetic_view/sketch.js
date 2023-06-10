new Q5("global")

const Y_AXIS = 1
const X_AXIS = 2
const onefifth = width / 5

let bars = []
let limit = []
let numbars = 25,
	minwide = .01,
	maxwide = .12,
	speedmult = .5,
	fgcolor = "#90cfc7",
	// bgcolor = "#404040",
	bgcolor = "black",
	topmult = .3,
	botmult = .7,
	edgecolor = "#404040",
	direction = "R",
	speedset = [.5, 3.5, 2, -.5, -3.5, -2]


function setup() {
	// createCanvas(windowWidth, 100);
	createCanvas(windowWidth, windowHeight)

	for (let i = 0; i < numbars; i++) {
		bars[i] = new Bar()
	}
	for (let i = 0; i < numbars; i++) {
		bars[i] = new Bar()
	}
	rectMode(CENTER)
	colorMode(RGB)

}

function draw() {
	background(bgcolor)
	stroke(`${fgcolor}aa`)
	strokeWeight(8)

	//rails
	fill(`${fgcolor}40`)
	rect(windowWidth / 2, windowHeight / 2 + 50, windowWidth, 100)

	for (let i = 0; i < bars.length; i++) {
		bars[i].move()
		if (bars[i].in) {
			bars[i].grow()
		}
		if (bars[i]) {
			bars[i].display()
		}
	}
	setGradient(0, height / 2 - 10, width / 7, 120, color(0, 80), color(0, 0), X_AXIS)
	setGradient(width - width / 7, height / 2 - 10, width / 5, 120, color(0, 0), color(0, 80), X_AXIS)

	filter(BLUR, 10)

}

// Bar class
function Bar() {
	if (!this.wide) {
		this.x = random(width)
		this.y = windowHeight / 2
		this.wide = 0
		this.targetwide = this.origwide = getwide()
		this.speed = getspeed()
		this.in = 250
	}

	this.dark = random(1) < .50 ? true : false

	console.log(`LOG..sketch: width`, width)

	this.grow = function () {
		this.wide += this.targetwide / this.in
		if (this.wide > this.targetwide) {
			this.wide = this.targetwide
		}
		this.in--
	}

	this.wink = function (towink) {
		let tomove = bars.pop()
		bars.splice(towink, 1, tomove)
	}

	// this.remove = function(toremove) {
	//   let tomove = bars.pop()
	//   bars.splice(toremove, 1, tomove);
	// }

	let offset = getwide() / 2
	this.move = function () {
		this.x += this.speed
		if (this.x > width + (offset * 2)) {
			localcolor = fgcolor
			this.speed = getspeed()
			offset = getwide() / 2
			if (direction == "L") {
				this.x = width
			} else {
				this.x = 0 - this.wide
			}
		} else if (this.x < 0 - (offset * 2)) {
			localcolor = fgcolor
			this.speed = getspeed()
			offset = getwide() / 2
			if (direction == "R") {
				this.x = 0 - this.wide
			} else {
				this.x = width
			}
		};

	}


	let localcolor = this.dark ? pSBC(random(.5), "#000", fgcolor) : fgcolor

	this.display = function () {
		// const ninetieth = width - onefifth
		// if (this.x > (width - onefifth)) {
		// 	let loc = this.x
		// 	let scale = (loc - ninetieth) / onefifth
		// 	localcolor = pSBC(1 - scale, "#000", localcolor)
		// 	// debugger
		// 	// console.log(`LOG..sketch: loc`, loc)
		// } else if (this.x < (0 + onefifth)) {

		// }
		fill(localcolor)
		noStroke()


		beam(this.x - offset, this.y)
		beam(this.x + offset, this.y)

		stroke(`${localcolor}40`)
		fill(`${localcolor}40`)
		// stroke(localcolor)
		strokeWeight(8)
		rect(this.x, this.y + 50, offset * 2, 100)

	}

	this.setmin = function (newmin) {
		this.wide = width * newmin
	}

	this.setmax = function (newmax) {
		this.wide = width * newmax
	}

	function getwide() {
		return width * random(minwide, maxwide)
	}
}

const beam = (x, y) => {
	circle(x, y, 20)
	circle(x, y + 100, 20)
	triangle(x - 10, y, x + 10, y, x, y + 50)
	triangle(x - 10, y + 100, x + 10, y + 100, x, y + 50)
	rect(x, y + 50, 8, 100)
}



window.wallpaperPropertyListener = {
	applyUserProperties: function (properties) {
		if (properties.preset) {
			// numbars = ;
			// speedmult = ;
			// bgcolor = color(`rgb(, , )`);
			// fgcolor = color(`rgb(, , )`);
			// edgecolor = color(`rgb(, , )`);
			// setminsize();
			// setmaxsize();
			// topmult = .;
			// botmult = .;

			switch (properties.preset.value) {
				case 0:
					// Dark Cyan
					numbars = 50
					speedmult = .1
					bgcolor = color(`rgb(0 ,0 ,0 )`)
					fgcolor = color(`rgb(0 ,12% ,16% )`)
					edgecolor = color(`rgb(0, 12%, 16%)`)
					setminsize(1)
					setmaxsize(3)
					topmult = .63
					botmult = .75
					location.reload()
					break

				case 1:
					// Red Line
					numbars = 14
					speedmult = .3
					bgcolor = color(`rgb(43%, 0, 0)`)
					fgcolor = color(`rgb(25%, 0, 0)`)
					edgecolor = color(`rgb(25%, 0, 0)`)
					setminsize(5)
					setmaxsize(20)
					topmult = .38
					botmult = .39
					location.reload()
					break

				default:
					break
			}
		}
		if (properties.density) {
			let newdensity = properties.density.value
			// console.log(numbars, newdensity);
			if (numbars < newdensity) {
				for (let i = numbars; i < newdensity; i++) {
					bars[i] = new Bar()
				}
			} else if (numbars > newdensity) {
				let towink = Math.floor(random(bars.length - 1))
				bars[towink].wink(towink)
			}
			numbars = newdensity
		}
		if (properties.background_color) {
			incomingBG = properties.background_color.value.split(' ');;
			let newBG = incomingBG.map(x => x * 100)
			bgcolor = color(`rgb(${newBG[0]}%, ${newBG[1]}%, ${newBG[2]}%)`)
		}
		if (properties.foreground_color) {
			setfgcolor(properties.foreground_color.value)
		}
		if (properties.edge_color) {
			incomingedge = properties.edge_color.value.split(' ');;
			let newedge = incomingedge.map(x => x * 100)
			edgecolor = color(`rgb(${newedge[0]}%, ${newedge[1]}%, ${newedge[2]}%)`)
		}
		if (properties.minimum_size) {
			setminsize(properties.minimum_size.value)
		}
		if (properties.maximum_size) {
			setmaxsize(properties.maximum_size.value)
		}
		if (properties.speed) {
			setspeed(properties.speed.value)
		}
		if (properties.top_edge) {
			topmult = properties.top_edge.value * .01
			console.log(topmult)
		}
		if (properties.bottom_edge) {
			botmult = properties.bottom_edge.value * .01
		}
		if (properties.direction) {
			direction = properties.direction.value
			console.log(properties.direction.value)
			for (let i = 0; i < bars.length; i++) {
				if (direction == "L" && bars[i].speed > 0) {
					bars[i].speed *= -1
				} else if (direction == "R" && bars[i].speed < 0) {
					bars[i].speed *= -1
				} else {
					bars[i].speed = getspeed()
				}
			}
		}
	}
}

function setmaxsize(x) {
	let newmax = x * .01
	maxwide = newmax
	for (let i = 0; i < bars.length; i++) {
		if (bars[i].wide > (width * newmax)) {
			bars[i].setmax(newmax)
		}
	}
}

function setminsize(x) {
	let newmin = x * .01
	minwide = newmin
	for (let i = 0; i < bars.length; i++) {
		if (bars[i].wide < (width * newmin)) {
			bars[i].setmin(newmin)
		}
	}
}

function setfgcolor(x) {
	incomingFG = x.split(' ')
	for (let i = 0; i < bars.length; i++) {
		let newFG = incomingFG.map(x => x * 100)
		let r = .5
		fgcolor = color(`rgba(${newFG[0]}%, ${newFG[1]}%, ${newFG[2]}%, ${r})`)
	}
}

function setspeed(x) {
	for (let i = 0; i < bars.length; i++) {
		let oldspeed = bars[i].speed
		let nomult = oldspeed / speedmult
		bars[i].speed = nomult * x
	}
	speedmult = x
}

function getspeed() {
	switch (direction) {
		case "L":
			speedset = [-1, -2.5, -1.5]
			break

		case "R":
			speedset = [1, 2.5, 1.5]
			break

		default:
			speedset = [1, 2.5, 1.5, -1, -2.5, -1.5]
			break
	}
	let r = random(speedset)
	let vary = random(.8)
	return (r + vary) * speedmult
}

/**
 * 
 * @param {*} x  
 * @param {*} y 
 * @param {*} w  width
 * @param {*} h  height
 * @param {*} c1  color 1
 * @param {*} c2  color 2
 * @param {*} axis  X_AXIS or Y_AXIS
 */
function setGradient(x, y, w, h, c1, c2, axis) {
	noFill()

	if (axis === Y_AXIS) {
		// Top to bottom gradient
		for (let i = y; i <= y + h; i++) {
			let inter = map(i, y, y + h, 0, 1)
			let c = lerpColor(c1, c2, inter)
			stroke(c)
			line(x, i, x + w, i)
		}
	} else if (axis === X_AXIS) {
		// Left to right gradient
		for (let i = x; i <= x + w; i++) {
			let inter = map(i, x, x + w, 0, 1)
			// console.log(`LOG..sketch: inter`, (c1, c2, inter))
			// debugger
			let c = lerpColor(c1, c2, inter)
			stroke(c)
			line(i, y, i, y + h)
		}
	}
}