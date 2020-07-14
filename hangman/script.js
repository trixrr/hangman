const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];
// grabbing words array, applying math.floor then math.random * by words.length; gives random word

const correctLetters = [];
const wrongLetters = [];

// show hidden word
function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
      .split('')
      .map(letter =>
         `<span class="letter"> ${correctLetters.includes(letter) ?  letter : ''}</span>`)
          .join('')}
              `;

  // set innerHTML to selectedWord which is a random word
  // .split('') splits word into an array
  // .map through with letter as iterator 
  // return a span with class letter 
  // ? if it is then show letter     : (else) return '' 
  // .join ('') turn back into a string. 

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  // replace \n  (new line character) with ''  g(globally)
  // new line character being generated because Javascript will return a bunch of spans with class letter and innerText only returns the content not the elements(spans) and after each letter it will return \n because of combination of split, map and join methods. 

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations you won!';
    popup.style.display = 'flex';
  }
}

// UPDATE WRONG LETTERS
function updateWrongLettersEl() {
  // display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  })

  // check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Sorry you lost, try again!';
    popup.style.display = 'flex';
  }
}
// check wrongLetters length of array, if anything in there aka more than  > 0    ?if there is? add <p>wrong</p>  :else:  add nothing
// next go through the letters with map use letter as iterator 
// return a span with the chosen letter.


// figureParts forEach part as iterator and index (starting at 0)
// errors = wrongLetters.length which is how many are in arr
// if there are less figureparts (index) than errors 
// then simply add a figurepart for each time there is an error generated by displaying block. 


// SHOW NOTIFICATION
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000)
}





// Keydown letter press
window.addEventListener('keydown', e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) { // if doesnt include
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) { // if doesnt include
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
})
// a - z  = 65 - 90
// if e.keyCode between a-z (store in letter var)
// if sel word inc letter and corr letters ! does not include letter then push letter to corrletters.
// then run displayWord


// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  // empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';

})

displayWord();