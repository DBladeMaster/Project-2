﻿/*
David Harris
October, 31, 2014 v2
This Javascript is to allow a slotmachine to function on webpages, once the js is included on it.

*/

/// <reference path="../Thanks.html" />
/// <reference path="../Thanks.html" />
/// <reference path="jquery.js" />
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;
var reel;
var grape;
var bar;
var seven;
var banana;
var blank;
var orange;
var bell;
var cherry;



//When the program first boots up it will set the initial fps and put out a welcoming message.
function init() {
    stage = new createjs.Stage(document.getElementById("canvas"));
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);

    alert("Welcome to my slotmachine game, and enjoy!.");
    drawSlotMachine();
}

//Handles each tick that passes in the slot machine.
function handleTick() {
    stage.update();
}


//This function is to draw out the slot machine and add in any needed images
function drawSlotMachine() {
    var slotmachine = new createjs.Bitmap("img/Slotmachine.jpg");
    slotmachine.scaleX = 1.2;
    slotmachine.scaleY = 1.2;

    var myButton = new createjs.Bitmap("img/Button.jpg");
   myButton.scaleX = 0.3;
   myButton.scaleY = 0.3;
   myButton.x = 345;
   myButton.y = 30;

    reel = new createjs.Bitmap("img/reel.jpg");
    reel.scaleX = 0.3;
    reel.scaleY = 0.3;
    reel.x = 100;
    reel.y = 70;

    var reel2 = new createjs.Bitmap("img/reel.jpg");
    reel2.scaleX = 0.3;
    reel2.scaleY = 0.3;
    reel2.x = 175;
    reel2.y = 70;

    var reel3 = new createjs.Bitmap("img/reel.jpg");
    reel3.scaleX = 0.3;
    reel3.scaleY = 0.3;
    reel3.x = 250;
    reel3.y = 70;


    grape = new createjs.Bitmap("img/Slot_Grapes.png");
    bar = new createjs.Bitmap("img/Slot_Bar.png");
    seven = new createjs.Bitmap("img/Slot_Seven.png");
    banana = new createjs.Bitmap("img/Banana.png");
    blank = new createjs.Bitmap("img/blank.png");
    orange = new createjs.Bitmap("img/Slot_Orange.png");
    bell = new createjs.Bitmap("img/Slot_Bell.png");
    cherry = new createjs.Bitmap("img/Slot_Cherry.png");

    outcome = Reels();
    //tested out alot of ways to figure out how to get the slots to work but they did not show up, nor did this. I'm out of time to continue.
    if (outcome[0] <= 28) {
        blank.x = 0;
        blank.y = 0;
    }

   

    //Adds in all the images as the child for this function
    stage.addChild(slotmachine, myButton, reel, reel2, reel3, grape, bar, seven, banana,orange, bell, cherry, blank);
    //If the button is clicked activate the click, over , and out handlers.
    myButton.addEventListener("click", clickHandler);
    myButton.addEventListener("mouseover", overHandler);
    myButton.addEventListener("mouseout", outHandler);
}

//If the user clicks on the button it will initiate the clickhandler function which will turn out the results of the spin and if they have won or lost.
function clickHandler() {
    playerBet = $("div#betEntry>input").val();

    if (playerMoney == 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet < 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        $("div#result>p").text(fruits);
        determineWinnings();
        turn++;
        showPlayerStats();
    }
    else {
        alert("Please enter a valid bet amount");
    }

    var stage;

}

function overHandler() {
    myButton.alpha = 0.5;
    reel.alpha = 0.5;
}

function outHandler() {
    myButton.alpha = 1.0;
    reel.alpha = 1.0;
}
/////////////

/* Utility function to show Player Stats */
function showPlayerStats()
{
    winRatio = winNumber / turn;
    $("#jackpot").text("Jackpot: " + jackpot);
    $("#playerMoney").text("Player Money: " + playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}


/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}

/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    $("div#winOrLose>p").text("You Won: $" + winnings);
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    $("div#winOrLose>p").text("You Lost!");
    resetFruitTally();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds)
    {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                break;
        }
    }

    

    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings()
{
    if (blanks == 0)
    {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if(bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else
    {
        lossNumber++;
        showLossMessage();
    }
    
}


/*When the player hits this button the game resets!*/
$("#resetButton").click(function () {
    if (confirm("Do you really wish to reset?")) {
        resetAll();
        showPlayerStats();
    }


});
/*When the player clicks on this button the user will be redireted to another page.*/
$("#quitButton").click(function () {
    if (confirm("Do you really wish to quit?")) {
        window.location.href = "thanks.html";
    }


});
