let game = {
	timer: 0,
	timerInterval: null,
	timeDisplay: document.getElementById("timer"),
	pause: true,

	divNumber: [undefined, 1, 2, 3, 4, 5, 6, 7, 8, 0],
	divAvailableDirection: [
		undefined,
		[2, 4],
		[1, 3, 5],
		[2, 6],
		[1, 5, 7],
		[2, 4, 6, 8],
		[3, 5, 9],
		[4, 8],
		[5, 7, 9],
		[6, 8],
	],
	divPosition: [
		undefined,
		[0, 0],
		[150, 0],
		[300, 0],
		[0, 150],
		[150, 150],
		[300, 150],
		[0, 300],
		[150, 300],
		[300, 300],
	],
};

resetGame();

function resetGame() {
	clearInterval(game.timerInterval);
	game.timer = 0;
	game.pause = true;
	updateTimerDisplay();
	document.getElementById("start").innerHTML = "START";
	document.getElementById("cover").style.display = "block";

	let position = game.divNumber.indexOf(0);
	for (let i = 1; i < 50; i++) {
		position = generateRandomDiv(position);
	}
}

function start() {
	if (game.pause) {
		document.getElementById("cover").style.display = "none";
		document.getElementById("start").innerHTML = "PAUSE";
		game.pause = false;
		startTimer();
	} else {
		document.getElementById("cover").style.display = "block";
		document.getElementById("start").innerHTML = "START";
		game.pause = true;
		clearInterval(game.timerInterval);
	}
}

function generateRandomDiv(i) {
	let array = game.divAvailableDirection[i];
	const randomTargetDiv = array[Math.floor(Math.random() * array.length)];

	document.getElementById(
		`d${game.divNumber[randomTargetDiv]}`
	).style.left = `${game.divPosition[i][0]}px`;
	document.getElementById(
		`d${game.divNumber[randomTargetDiv]}`
	).style.top = `${game.divPosition[i][1]}px`;

	let temp = game.divNumber[randomTargetDiv];
	game.divNumber[randomTargetDiv] = game.divNumber[i];
	game.divNumber[i] = temp;

	return randomTargetDiv;
}

function move(id) {
	let i;
	for (i = 1; i < 10; i++) {
		if (game.divNumber[i] === id) break;
	}

	const targetDiv = calculateTargetDiv(i);
	if (targetDiv) {
		game.divNumber[i] = 0;
		game.divNumber[targetDiv] = id;

		document.getElementById(
			`d${id}`
		).style.left = `${game.divPosition[targetDiv][0]}px`;
		document.getElementById(
			`d${id}`
		).style.top = `${game.divPosition[targetDiv][1]}px`;
	}

	let gameFininshed = true;
	for (let j = 1; j < 9; j++) {
		if (game.divNumber[j] !== j) {
			gameFininshed = false;
			break;
		}
	}
	if (gameFininshed) {
		handleFinishGame();
	}
}

function handleFinishGame() {
	document.getElementById("start").innerHTML = "START";
	clearInterval(game.timerInterval);

	setTimeout(() => handleCongratulations(), 300);
}

function handleCongratulations() {
	const overlayElement = document.getElementById("overlay");
	const closeElement = document.getElementById("close");
	overlayElement.style.display = "block";
	closeElement.addEventListener("click", () => {
		overlayElement.style.display = "none";
	});
}

function calculateTargetDiv(currentDiv) {
	for (const value of game.divAvailableDirection[currentDiv]) {
		if (!game.divNumber[value]) {
			return value;
		}
	}
	return 0;
}

/**************timer******************************************/
function startTimer() {
	game.timerInterval = setInterval(() => {
		game.timer++;
		updateTimerDisplay();
	}, 1000);
}

function updateTimerDisplay() {
	game.timeDisplay.innerHTML = `${game.timer}`;
}

/**************theme******************************************/
function useNumber() {
	for (i = 1; i < 9; i++) {
		const element = document.getElementById(`d${i}`);
		element.style.backgroundImage = "url()";
		element.style.color = "white";
		element.addEventListener("mouseenter", () => {
			element.style.color = "#94b195";
		});
		element.addEventListener("mouseleave", () => {
			element.style.color = "white";
		});
	}
}
function useImage() {
	for (i = 1; i < 9; i++) {
		const elementStyle = document.getElementById(`d${i}`).style;
		elementStyle.backgroundImage = `url(./images/image_part_00${i}.jpg)`;
		elementStyle.color = "transparent";
	}
}
