/*
 * Create a list that holds all of your cards
 *
 */

let cards = [
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-bomb",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-bomb"
];

// The variable is used to count total number of card openening attempts
let numOfCardClicks = 0;

// The variable is used to store the rating (number of starts)
let rating = 5;

// The function will create each card's HTML <li>:s and <i>:s and add them to the page under the <ul> deck

function createCardDecksHtmlLayout(myCards) {
  const fragment = document.createDocumentFragment();
  let index = 0;
  let deck = document.querySelector(".deck");

  // if card deck already exists, remove it...
  if (deck.hasChildNodes()) {
    while (deck.firstChild) {
      deck.removeChild(deck.firstChild);
    }
  }

  for (const card of myCards) {
    let newLi = document.createElement("li");
    newLi.className = "card";

    let newI = document.createElement("i");
    newI.className = `fa ${card}`;

    fragment.appendChild(newLi).appendChild(newI);
  }

  // at this point li/i fragment should be built - add it to the .document ul (deck) element
  document.querySelector(".deck").appendChild(fragment);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// The function handles click events that are triggered by either <li> element
function handleCardClick(evt) {
  let openCards = []; // the array of open (but not matched) cards

  if (evt.target.nodeName === "LI") {
    /*
     * <i> (a child of <li>) contains a 'fa-'class that represents the card's symbol
     *
     * The <li> - card can have the following layouts:
     *
     *  <li class="card">            --> face down, symbol not shown
     *  <li class="card open show">  --> oppened, not matched (2 cards max, not the ones already matched)
     *  <li class="card match">      --> card is already matched with another card
     *
     * */

    // fetch all opened cards (there should be none, one or two of them)
    openCards = document.querySelectorAll(".open, .show");

    if (evt.target.classList.length == 1) {
      // The current card was previously hidden, show the card
      evt.target.classList.add("open", "show");

      // display the global counter of card openening attempts (moves)
      document.querySelector(".moves").innerHTML = ++numOfCardClicks;

      // fetch all opened cards (there should be one or two of them)
      openCards = document.querySelectorAll(".open, .show");

      // if the very first card is opened, start the timer
      if (numOfCardClicks == 1) {
        myTimerVar = myTimer();
      }

      if (openCards.length == 2) {
        // if 2 cards are open... compare the cards

        if (
          openCards[0].childNodes[0].classList[1] ==
          openCards[1].childNodes[0].classList[1]
        ) {
          // if two cards match...
          // display the card pair as matched
          openCards[0].classList.add("card", "match");
          openCards[1].classList.add("card", "match");

          // remove open and show classes from the matched pair
          openCards[0].classList.remove("open", "show");
          openCards[1].classList.remove("open", "show");

          // clear the openCard list
          openCards = [];
        } else if (
          openCards[0].childNodes[0].classList[1] !==
          openCards[1].childNodes[0].classList[1]
        ) {
          // if two cards don't match ... alow delay before closing the cards to make sure that the last opened card is shown first
          setTimeout(function() {
            // hide the cards
            openCards[0].classList.remove("open", "show");
            openCards[1].classList.remove("open", "show");

            // clear the openCard list
            openCards = [];
          }, 600);
        }
      }
    }
  }

  checkWinningConditions();
  handleRating();
}

function checkWinningConditions() {
  // if 16 cards have the class "match", we're done with the game
  if (document.querySelectorAll(".match").length == 16) {
    setTimeout(function() {
      // alow delay before closing all the cards to make sure that the last opened card is shown first...
      let result = window.confirm(
        "You've finished the game my friend! Well done!!" +
          "\nGame duration: " +
          min +
          "m:" +
          sec +
          "s" +
          "\nMoves: " +
          numOfCardClicks +
          "\nRating: " +
          rating +
          "\n\nDo you want to restart the game?"
      );

      console.log(result);

      if (result) {
        // reset everything...

        numOfCardClicks = 0;

        clearInterval(myTimerVar);
        sec = 0;
        min = 0;
        intervalCounter = 0;

        document.querySelector(".timer").innerText = "";
        document.querySelector(".moves").innerHTML = numOfCardClicks;

        // remove all the remaining stars
        let starsList = document.querySelectorAll(".fa-star");

        for (const star of starsList) {
          star.remove();
        }

        // add back 5 stars
        document.querySelector(
          ".stars"
        ).innerHTML = `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>`;

        // reset the rating
        rating = 5;

        // hide all the cards
        let cardsList = document.querySelectorAll(".card");

        for (const card of cardsList) {
          card.classList.remove("open", "show", "match");
        }

        createCardDecksHtmlLayout(shuffle(cards)); // shuffle cards again and display the new deck
      }
    }, 200);
  }
}

/**
 * Game elapsed time
 */
let intervalCounter = 0;
let sec = 0;
let min = 0;
let myTimerVar = null;

function myTimer() {
  myTimerVar = setInterval(counterFunc, 1000);
  return myTimerVar;
}

function counterFunc() {
  intervalCounter++;

  min = parseInt(intervalCounter / 60);
  sec = intervalCounter % 60;

  document.querySelector(".timer").innerText = `Time elapsed: ${min}:${sec}`;
}

/**
 * Function calculates and displays the *rating*. We start with 5 starts and remove a star for every 10 clicks starting from 25 clicks.
 * The rating stays at 1 start after 55 clicks (moves)
 *
 */

function handleRating() {
  if (numOfCardClicks == 25) {
    document.querySelector(".stars").lastElementChild.remove();
    rating--;
  } else if (numOfCardClicks == 35) {
    document.querySelector(".stars").lastElementChild.remove();
    rating--;
  } else if (numOfCardClicks == 45) {
    document.querySelector(".stars").lastElementChild.remove();
    rating--;
  } else if (numOfCardClicks == 55) {
    document.querySelector(".stars").lastElementChild.remove();
    rating--;
  }
}

/**
 * Function init() prepares the initial deck and add's event listeners
 */
function init() {
  createCardDecksHtmlLayout(shuffle(cards)); // display the shuffled deck of cards

  // delegate events to the parent element .deck
  document.querySelector(".deck").addEventListener("click", handleCardClick);

  // reload the page if the reload button is pressed
  document.querySelector(".restart").addEventListener("click", function() {
    window.location.reload(false);
  });
}

init();
