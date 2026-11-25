var words = ["MATTDUBZ", "WINTER", "SCARF", "ALFONSOPOOPY", "FROST", "DEEZNUTZ", "SLEET", "CHILL", "FAIRS", "COCOA"];

var snowmanParts = [".hat", ".face", ".scarf", ".hands", ".body-top", ".body-middle", ".body-bottom"];
var randomWord = getRandomWord(words);
var keyboardContainer = document.querySelector('#keyboard-container');
var gameOver = false;
keyboardContainer.addEventListener("click", handleKeyboardClick);

generateHiddenWord(randomWord);

function handleKeyboardClick(event){
  if (gameOver) return;

  var clickedElement = event.target;

  if (!clickedElement.classList.contains("letter") || clickedElement.classList.contains("selected")) return;

  clickedElement.classList.add("selected");
  
  var clickedLetter = clickedElement.textContent;
  var hasMatch = checkForMatch(clickedLetter);

  if (!hasMatch) {
    removeSnowmanPart();
    checkForLoser();
  } else {
    checkForWinner();
  }
}

function checkForMatch(clickedLetter) {
 var hiddenLetterElements = document.querySelectorAll(".hidden");
 var hasMatch = false;
 
 hiddenLetterElements.forEach(hiddenLetterElement => {
  var hiddenLetter = hiddenLetterElement.textContent;
  // console.log(hiddenLetter, clickedLetter)
    if (hiddenLetter === clickedLetter) {
      hiddenLetterElement.classList.remove("hidden");
      hasMatch = true;
    }
  
 })
 return hasMatch;
}

function removeSnowmanPart() {
  var snowmanPart = snowmanParts.shift();
  var partsToRemove = document.querySelectorAll(snowmanPart);
  
  partsToRemove.forEach(partToRemove =>{
    partToRemove.remove();

  })
}


function generateHiddenWord(word) {
  var letters = word.split("");
  var emptyLetterContainer = document.querySelector("#empty-letter-container");

  var lettersHTML = "";
  for (var letter of letters) {
    var letterHTML = `<p class="letter-container"><span class="letter hidden">${letter}</span></p>`;
    lettersHTML += letterHTML;
  }

  emptyLetterContainer.innerHTML = lettersHTML;
}

function getRandomWord(words) {
  var randomIndex = Math.floor(Math.random() * words.length);
  var randomWord = words[randomIndex];
  return randomWord;
}

function checkForLoser() {
  if (snowmanParts.length === 0) {
    gameOver = true;
    showMessage("You lost!");
  }
}

function checkForWinner() {
  var hiddenLetters = document.querySelectorAll(".hidden");

  if (hiddenLetters.length === 0) {
    gameOver = true;
    showMessage("You won!");
  }
}

function showMessage(text) {
  var message = document.createElement("h2");
  message.textContent = text;
  document.querySelector("main").appendChild(message);
}

