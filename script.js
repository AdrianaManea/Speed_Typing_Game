const wordEl = document.getElementById('word'),
  text = document.getElementById('text'),
  timeEl = document.getElementById('time'),
  scoreEl = document.getElementById('score'),
  endgameEl = document.getElementById('end-game-container'),
  settingsBtn = document.getElementById('settings-btn'),
  settings = document.getElementById('settings'),
  settingsForm = document.getElementById('settings-form'),
  difficultySelect = document.getElementById('difficulty');


let words = [];

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value in localStorage or medium
// let difficulty = 'medium';
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

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

  // Prevent to change de difficulty while playing
  if (time < 15) {
    document.getElementById('difficulty').disabled = true;
  }

  // Reactivate the difficultu selection once the game is over
  if (time === 0) {
    document.getElementById('difficulty').disabled = false;
  }

  // When less than 6s, change time color
  if (time < 6) {
    timeEl.style.color = "#ff0000";
  }

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

    // time += 2;
    if (difficulty === 'hard') {
      time += 3;
    } else if (difficulty === 'medium') {
      time += 5;
    } else {
      time += 8;
    }

    updateTime();
  }
}


// Event Listeners
// Typing 
text.addEventListener('input', Typing);

// Settings btn click
settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
});

// Settings select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  // console.log(difficulty);
  localStorage.setItem('difficulty', difficulty);
});





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