const wordEl = document.getElementById('word'),
  text = document.getElementById('text'),
  timeEl = document.getElementById('time'),
  scoreEl = document.getElementById('score'),
  endgameEl = document.getElementById('end-game-container'),
  settingsBtn = document.getElementById('settings-btn'),
  settings = document.getElementById('settings'),
  difficultySelect = document.getElementById('difficulty');


let words = [];

// Init score
let score = 0;

// Init time
let time = 10;

// Focus on text on Start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);


function getRandomWord() {
  fetch(`https://random-word-api.herokuapp.com/word?number=1`)
    .then((response) => response.json())
    .then((data) => {
      // better spread the data into the words array
      words = [...data];
      console.log(words);

      addWordToDOM();
    });
}
getRandomWord();


// Add word to DOM
function addWordToDOM() {
  words.forEach(word => {
    wordEl.innerHTML = word;
  });
}


// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}


// Update Time
function updateTime() {
  // console.log(1);

  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);

    // End Game
    gameOver();
  }
}

// Game over, show End Screen
function gameOver() {
  endgameEl.innerHTML = `
  <h1 >Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="window.location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

function Typing(e) {
  const insertedText = e.target.value;
  // console.log(insertedText);

  if (insertedText === words[0]) {
    // console.log(insertedText);
    addWordToDOM();
    updateScore();
    //Clear input
    e.target.value = '';
    getRandomWord();

    time += 6;
    updateTime();
  }
}


// Event Listeners
// Typing 
text.addEventListener('input', Typing);








// List of words for game
// const words = [
//   'member',
//   'even',
//   'foreigner',
//   'reader',
//   'venture',
//   'shop',
//   'closed',
//   'mention',
//   'food',
//   'smell',
//   'disturbance',
//   'topple',
//   'liability',
//   'indulge',
//   'economic',
//   'path',
//   'sketch',
//   'edge',
//   'myth',
//   'displace',
//   'reporter',
//   'salad',
//   'head',
//   'cutting',
//   'discuss',
//   'syndrome',
//   'researcher',
//   'governor',
//   'trick',
//   'harm',
//   'white',
//   'love',
//   'activate',
//   'balance',
//   'twilight',
//   'ash',
//   'trunk',
//   'trail',
//   'control',
//   'salesperson',
//   'fountain',
//   'brake',
//   'selection',
//   'airplane',
//   'licence',
//   'roar',
//   'velvet',
//   'adviser',
//   'steak',
//   'suntan'
// ];

// let randomWord;

// // Generate random word from array
// function getRandomWord() {
//   return words[Math.floor(Math.random() * words.length)];
// }

// // Add word to DOM
// function addWordToDOM() {
//   randomWord = getRandomWord();
//   wordEl.innerHTML = randomWord;
// }

// addWordToDOM();