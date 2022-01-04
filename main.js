const startButton = document.querySelector(".start");
const timeDiv = document.querySelector(".time");
let divs = document.querySelectorAll(".small");
const title = document.querySelector("h1");
const pointsDiv = document.querySelector(".points");
const lifesDiv = document.querySelector(".lifes");
const resetButton = document.querySelector(".reset");
const game = {
  time: 10,
  points: 0,
  lifes: 3,
};

divs = [...divs];

let gameIsStarted = false;

counting = function () {
  startTime = setInterval(function () {
    game.time -= 1;
    timeDiv.textContent = `Czas ${game.time}s`;
    if (game.time === 0) {
      startButton.addEventListener("click", startGame);
      alert(`Koniec czasu. Zdobyłeś ${game.points} punktów.`);
      game.time = 10;
      game.points = 0;
      game.lifes = 3;
      pointsDiv.textContent = `Punkty: ${game.points}`;
      lifesDiv.textContent = `Życia: ${game.lifes}`;
      timeDiv.textContent = `Czas ${game.time}s`;
      clearInterval(startTime);
      clearInterval(drawing);
      divs.forEach((div) => {
        div.removeEventListener("click", clickSquare);
      });
    }
  }, 1000);
};

const clickSquare = function () {
  if (this.classList.contains("active")) {
    game.points++;
    pointsDiv.textContent = `Punkty: ${game.points}`;
  } else {
    game.lifes--;
    lifesDiv.textContent = `Życia: ${game.lifes}`;
    if (game.lifes === 0) {
      startButton.addEventListener("click", startGame);
      alert(`Straciłeś wszystkie życia. Twój wynik to: ${game.points}`);
      game.time = 10;
      game.points = 0;
      game.lifes = 3;
      pointsDiv.textContent = `Punkty: ${game.points}`;
      lifesDiv.textContent = `Życia: ${game.lifes}`;
      timeDiv.textContent = `Czas ${game.time}s`;
      clearInterval(startTime);
      clearInterval(drawing);
      divs.forEach((div) => {
        div.removeEventListener("click", clickSquare);
      });
    }
  }
};

const startDrawing = () => {
  drawing = setInterval(function () {
    let number = Math.floor(Math.random() * divs.length);
    divs[number].classList.add("active");
    setTimeout(function () {
      divs[number].classList.remove("active");
    }, 1000);
  }, 1000);
};

const activingSquare = () => {
  divs.forEach((div) => {
    div.addEventListener("click", clickSquare);
  });
};

const startGame = () => {
  gameIsStarted = true;
  if (gameIsStarted) {
    startButton.removeEventListener("click", startGame);
  }
  startDrawing();
  counting();
  activingSquare();
};

reset = () => {
  game.time = 10;
  game.points = 0;
  game.lifes = 3;
  pointsDiv.textContent = `Punkty: ${game.points}`;
  lifesDiv.textContent = `Życia: ${game.lifes}`;
  timeDiv.textContent = `Czas ${game.time}s`;
  clearInterval(startTime);
  clearInterval(drawing);
  divs.forEach((div) => {
    div.removeEventListener("click", clickSquare);
  });
  startButton.addEventListener("click", startGame);
};

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", reset);
