"use strict";
// Audio load

// let pads = document.getElementsByClassName('pad'); // pads
let pads = document.querySelectorAll('div[data-sound]'); // pads
let counter = document.getElementById('counter'); // counter text
let btnStart = document.getElementById('start'); // start button
const audio = document.querySelectorAll(`audio[data-sound]`);
let strictCheckbox = document.getElementById('strict');

let game = {
	isGameStarted: false,
	isStrict: false,
	computerSteps: [],
	playerSteps: [],
	count: 1,

	padOnclick: function() {
		//There I add event listener on click 
		pads.forEach((pad) => {
			pad.addEventListener('click', () => {
				const audio = document.querySelector(`audio[data-sound="${pad.dataset.sound}"`);
				audio.currentTime = 0; // Restart time
				audio.play();
				// console.log(pad.dataset.sound);
				this.playerSteps.push(pad.dataset.sound); // pad value push in player array
				this.check();
			});
		});
	},

	turnStrict: function() {
		strictCheckbox.addEventListener('click', () => {
			if (strictCheckbox.checked == true) {
				this.isStrict = true;
			} else if (strictCheckbox.checked == false) {
				this.isStrict = false;
			}
		});
	},

	padDisable: function(status) {
		if (status == 'disable') {
			pads.forEach((pad) => {
				pad.classList.add('disabled');
			});
		} else if (status == 'enable') {
			pads.forEach((pad) => {
				pad.classList.remove('disabled');
			});
		}
	},

	playSound: function(i) {
		// console.log(this.computerSteps);
		setTimeout(() => {
			if (this.computerSteps[i] == 0) {
				audio[0].play();
				pads[0].classList.add('playing');
			} else if (this.computerSteps[i] == 1) {
				audio[1].play();
				pads[1].classList.add('playing');
			} else if (this.computerSteps[i] == 2) {
				audio[2].play();
				pads[2].classList.add('playing');
			} else if (this.computerSteps[i] == 3) {
				audio[3].play();
				pads[3].classList.add('playing');
			}
			i++;
			console.log('This is the computerSteps ' + this.computerSteps);
			if (i < this.computerSteps.length) {
				this.playSound(i);
			} else {
				this.padDisable('enable');
			}
		}, 1000);

	},

	check: function() {
		if (this.computerSteps.length == this.playerSteps.length && this.computerSteps[this.computerSteps.length - 1] == this.playerSteps[this.playerSteps.length - 1]) {
			if (this.count == 20) {
				counter.innerHTML = 'W';
				this.playerSteps = [];
				this.computerSteps = [];
				setTimeout(() => {
					this.count = 1;
					this.stepUp();
				}, 1000);
			} else {
				this.count += 1;
				this.playerSteps = [];
				this.stepUp();
			}

		} else {
			if (this.playerSteps[this.playerSteps.length - 1] != this.computerSteps[this.playerSteps.length - 1]) {
				if (this.isStrict == true) {
					counter.innerHTML = '**';
					setTimeout(() => {
						this.count = 1;
						this.playerSteps = [];
						this.computerSteps = [];
						this.stepUp();
					}, 1500);
				} else {
					this.playerSteps = [];
					counter.innerHTML = '**';
					setTimeout(() => {
						counter.innerHTML = this.count;
						this.playSound(0);
					}, 2000)

				}
			}
		}
	},

	stepUp: function() {
		this.padDisable('disable');
		let randomPadNumber = Math.floor(Math.random() * pads.length); // number 0-3
		this.computerSteps.push(randomPadNumber); // adding steps and pushing the value in array
		this.playSound(0);

		counter.innerHTML = this.count;
	},

	init: function() {
		this.turnStrict();
		btnStart.addEventListener('click', () => {
			if (this.isGameStarted == false) {
				this.isGameStarted = true;
				this.stepUp();
				this.padOnclick();

			} else {
				this.count = 1;
				this.playerSteps = [];
				this.computerSteps = [];
				this.stepUp();
			}
		});
	}
};

game.init();


// Removing transition on tab
pads.forEach((k) => {
	k.addEventListener('transitionend', (e) => {
		e.target.classList.remove('playing');
	});
});