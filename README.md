# Matching game

## Table of Contents

* [Description](#description)
* [Instructions](#instructions)
* [Implementation](#implementation)

## Description

The game represents the classic matching (somewhere called memory) game.
The player needs to match (find a pair for) 8 different cards.
The game starts when the player clicks on the first card - timer is shown with the elapsed time.
The player then opens a second card and if two cards match they stay open.
If the cards don't match the cards are 'placed back face down'. The player continues opening the cards.

The game counts number of moves (number of time the player clicks on the card that is faced down).
Based on the number of the moves, the rating is calculated. The player starts with the rating of 5 stars
and 'looses' stars depending on the number of moves:

If in total the player makes the following number of moves, rating is as follows:
 <=24 moves: 5 stars
25-34 moves: 4 stars
35-44 moves: 3 stars
45-54 moves: 2 stars
  >55 moves: 1 stars 

The game finishes when the player match all 8 cards with it's pair.

When the game is over the player is shown the modal window with the results (number of moves, total playing time and rating) and 
the player can start over the game.

The player can in any time restart the game by clicking on the arrow on the top right corner. 
In that case the game is reloaded with freshly shuffled card deck and all the counters are reset to their initial value.


## Instructions

The app is implemented as a client side JS app. It is enough to download the full zip package (or clone the GitHub project) and run index.html


## Implementation

Note: This text is to be replaced with JSDoc or similar.

All JS code is placed in the js/app2.js file and it is decently documented. The code is organized in the following functions:

function shuffle(array)  - randomizes the initial deck of cards
function handleCardClick(evt) - the main function that has the *matching* logic implemented
function checkWinningConditions()  - the function checks if all the cards are matched and if they are, it resets the game (moves counter, timer, star rating), *clears the deck* and reshuffles it
function counterFunc() - the function meassures game duration time (from the event when the first card is clicked)
function handleRating() - the functions handles the rating (displays number of stars) based on the logic specified above
function createCardDecksHtmlLayout(cards) - the function *builds* a HTML representation of the card deck and as a fragment and adds it to the unordered list "deck"
function init() - the function initializes the game (shuffles the cards and adds event listeners)


