var deck = [0] //initialize array
var setCards = [] //set of three the user selects
var setSlots = [] //array which holds the actual slots selected because forethought is for smart people
var score = 0 //number of sets found in game

function logpls(text, color) { //function that updates the in-page log with whatever text
  if (color == undefined) { //defaults text color to black if i don't want different
    color = "#000000"
  }
  document.getElementById("logText").innerHTML = text
  document.getElementById("logText").style = color
}

function setCheck(card1, card2, card3, logDSK) { //function which checks if the given cards are a set

  if (card1[0] == card2[0] && card2[0] == card3[0] || card1[0] != card2[0] && card2[0] != card3[0] && card1[0] != card3[0]) {
    //all are the same number or all are different number
    if (logDSK == true) { logpls("Checking Number...Ok!") }
    if (card1[1] == card2[1] && card2[1] == card3[1] || card1[1] != card2[1] && card2[1] != card3[1] && card1[1] != card3[1]) {
      //same check for shading
      if (logDSK == true) { logpls("Checking Shading...OK!") }
      if (card1[2] == card2[2] && card2[2] == card3[2] || card1[2] != card2[2] && card2[2] != card3[2] && card1[2] != card3[2]) {
        //same check for color
        if (logDSK == true) { logpls("Checking Color...OK!") }
        if (card1[3] == card2[3] && card2[3] == card3[3] || card1[3] != card2[3] && card2[3] != card3[3] && card1[3] != card3[3]) {
          //final check for shape, will run if its a set
          if (logDSK == true) { logpls("Yep, that's a set!") }
          return true
        } else {
          if (logDSK == true) { logpls("Sorry, that's not a set! (Check the shapes!)") }
          return false
        }
      } else {
        if (logDSK == true) { logpls("Sorry, that's not a set! (Check the colors!)") }
        return false
      }
    } else {
      if (logDSK == true) { logpls("Sorry, that's not a set! (Check the shading!)") }
      return false
    }
  } else {
    //numbers don't fulfil set conditions
    if (logDSK == true) { logpls("Sorry, that's not a set! (Check the numbers!)") }
    return false
  }
}

function shuffle(a) { //kunth shuffle array
  let currentInd = a.length, randomInd;
  while (currentInd != 0) { //keep going until there are no more indexes left
    randomInd = Math.floor(Math.random() * currentInd) //pick another index
    currentInd--
    [a[currentInd], a[randomInd]] = [a[randomInd], a[currentInd]] //swap selected index with the current one
  }
  return a;
}

function drawDiamond(context, x, y, width, height) { //predefined function for drawing a diamond shape
  context.beginPath()
  context.moveTo(x, y)
  // top left edge
  context.lineTo(x - width / 2, y + height / 2)
  // bottom left edge
  context.lineTo(x, y + height)
  // bottom right edge
  context.lineTo(x + width / 2, y + height / 2)
  // closing the path automatically creates
  // the top right edge
  context.closePath()
}

function drawWave(context, x, y, width, height, skew) { //predefined function for drawing the wave shapes
  context.beginPath() //skew being the "intensity" of the shape, negative numbers make the wave closer to a rectangle
  //keep the origin in the corner of the shape footprint
  context.moveTo(x + skew, y)
  //first "arch"
  context.lineTo(x - skew - (width / 2), y + height / 3)
  context.lineTo(x + skew, y + 2 * (height / 3))
  //finish the left side
  context.lineTo(x - skew - (width / 2), y + height)
  //create the floor
  context.lineTo(x - skew, y + height)
  //reflected "arch" back up
  context.lineTo(x + skew + (width / 2), y + 2 * (height / 3))
  context.lineTo(x - skew, y + height / 3)
  //finish the right side
  context.lineTo(x + skew + (width / 2), y)
  //closing path finishes the ceiling
  context.closePath()
}

function cardDraw(ind, pos) { //draw card function
  let slot = document.getElementById("slot" + pos) //target canvas to draw to
  let number = (ind % 3) + 1 //assign number (1, 2 or 3)
  let color = ""
  let shading = ""
  
  //terrible code which assigns cards to index numbers, should be redone
  if (ind <= 26) { //make first third of cards red
    color = "red"
    if (ind <= 8) {
      shape = "circle"
      if (ind <= 2) {
        shading = "empty"
      }
      if (ind <= 5 && ind > 2) {
        shading = "half"
      }
      if (ind > 5) {
        shading = "full"
      }
    }
    if (ind <= 17 && ind > 8) {
      shape = "diamond"
      if (ind <= 11) {
        shading = "empty"
      }
      if (ind <= 14 && ind > 11) {
        shading = "half"
      }
      if (ind > 14) {
        shading = "full"
      }
    }
    if (ind > 17) {
      shape = "wave"
      if (ind <= 20) {
        shading = "empty"
      }
      if (ind <= 23 && ind > 20) {
        shading = "half"
      }
      if (ind > 23) {
        shading = "full"
      }
    }
  }
  if (ind <= 53 && ind > 26) { //second third green
    color = "green"
    if (ind <= 35) {
      shape = "circle"
      if (ind <= 29) {
        shading = "empty"
      }
      if (ind <= 32 && ind > 29) {
        shading = "half"
      }
      if (ind > 32) {
        shading = "full"
      }
    }
    if (ind <= 44 && ind > 35) {
      shape = "diamond"
      if (ind <= 38) {
        shading = "empty"
      }
      if (ind <= 41 && ind > 38) {
        shading = "half"
      }
      if (ind > 41) {
        shading = "full"
      }
    }
    if (ind > 44) {
      shape = "wave"
      if (ind <= 47) {
        shading = "empty"
      }
      if (ind <= 50 && ind > 47) {
        shading = "half"
      }
      if (ind > 50) {
        shading = "full"
      }
    }
  }
  if (ind >= 54) { //and the rest are purple
    color = "purple"
    if (ind <= 63) {
      shape = "circle"
      if (ind <= 56) {
        shading = "empty"
      }
      if (ind <= 59 && ind > 56) {
        shading = "half"
      }
      if (ind > 59) {
        shading = "full"
      }
    }
    if (ind <= 72 && ind > 62) {
      shape = "diamond"
      if (ind <= 65) {
        shading = "empty"
      }
      if (ind <= 68 && ind > 65) {
        shading = "half"
      }
      if (ind > 68) {
        shading = "full"
      }
    }
    if (ind > 71) {
      shape = "wave"
      if (ind <= 74) {
        shading = "empty"
      }
      if (ind <= 77 && ind > 74) {
        shading = "half"
      }
      if (ind > 77) {
        shading = "full"
      }
    }
  }
  //set slot title for hover over text
  slot.dataset.cardId = ind //tie the card number to the canvas element so it can be redrawn
  if (number == 1) { slot.setAttribute("title", number + " " + shading + " " + color + " " + shape) }
  else { slot.setAttribute("title", number + " " + shading + " " + color + " " + shape + "s") }
  //actual card drawing routine
  if (pos > 11){ toggleSpares() } //show the spare set if a card needs to go there
  let ctx = slot.getContext("2d")
  ctx.beginPath()
  ctx.clearRect(0, 0, slot.width, slot.height)
  if (shape == "circle") { //draws circle(s)
    ctx.save()
    ctx.scale(0.65, 1)
    for (let step = 0; step < number; step++) { //number parser
      ctx.beginPath()
      ctx.arc(112 + (step * 160), slot.height / 2, 60, 0, Math.PI * 2) //draws filled shape
      if (shading == "empty") {//empty fill (border)
        ctx.lineWidth = 9
        ctx.strokeStyle = color //color parser
        ctx.stroke()
      }
      if (shading == "full") {//full fill
        ctx.fillStyle = color //color parser
        ctx.fill()
      }
      if (shading == "half") { //half fill
        ctx.save();
        ctx.clip();
        ctx.lineWidth = 55;
        ctx.strokeStyle = color
        ctx.stroke();
        ctx.restore();
      }
    }
    ctx.restore()
  }
  if (shape == "diamond") { //draws diamond(s)
    for (let step = 0; step < number; step++) {
      drawDiamond(ctx, 72 + (step * 102), 20, 78, 135)
      if (shading == "empty") {
        ctx.lineWidth = 5
        ctx.strokeStyle = color
        ctx.stroke()
      }
      if (shading == "full") {
        ctx.fillStyle = color
        ctx.fill()
      }
      if (shading == "half") {
        ctx.save();
        ctx.clip();
        ctx.lineWidth = 36;
        ctx.strokeStyle = color
        ctx.stroke();
        ctx.restore();
      }
    }
  }
  if (shape == "wave") {
    for (let step = 0; step < number; step++) {
      drawWave(ctx, 72 + (step * 108), 20, 78, 135, 0)
      if (shading == "empty") {
        ctx.lineWidth = 5
        ctx.strokeStyle = color
        ctx.stroke()
      }
      if (shading == "full") {
        ctx.fillStyle = color
        ctx.fill()
      }
      if (shading == "half") {
        ctx.save();
        ctx.clip();
        ctx.lineWidth = 24;
        ctx.strokeStyle = color
        ctx.stroke();
        ctx.restore();

      }
    }
  }
  ctx.closePath()
}

function clearSlot(pos) {
  let slot = document.getElementById("slot" + pos) //target slot
  let ctx = slot.getContext("2d")
  ctx.beginPath()
  ctx.clearRect(0, 0, slot.width, slot.height)
  ctx.closePath()
  slot.dataset.cardId = ""
  slot.title = "Empty Slot"
}

function deckDeal() { //put cards into all twelve slots
  for (let step = 0; step < 12; step++) {
    //reading and removing from the end of the array reduces processing, though in this case it's miniscule
    cardDraw(deck[deck.length - 1], step) //read the last card in the deck
    deck.pop() //remove from the array
  }
}

function getHand() { //create an array of the current set of cards, bar empty slots
  let workDeck = []
  for (step = 0; step < 15; step++) { //parse the cards
    //i genuinely have no idea why parsing the cards the same as in the set check funtion doesn't work here
    //i had to split the cards first, otherwise endsWith() wouldn't work
    workDeck[step] = document.getElementById("slot" + step).title.split(" ") //split the card titles
	
    if (workDeck[step][3] == undefined) {
      workDeck.splice(step, 1)
    }
    else if (workDeck[step][3].endsWith("s")) {
      workDeck[step][3] = workDeck[step][3].slice(0, -1) //remove the plural
    }
  }
  for (step = 14; step >= 0; step--) { //remove empties
    if (workDeck[step] == undefined)
      workDeck.splice(step, 1)
  }
  return workDeck
}

function capCheck() { //check if the given deck of 12 is a cap set
  let workDeck = getHand()//create an array of the current set of twelve cards, removing blanks
  console.log(workDeck)
  let validSets = 0 //variable which stores the number of present sets
  for (i = 0; i < workDeck.length; i++) { //first pick a card 
    for (j = i + 1; j < workDeck.length; j++) { //go through every other card
      for (k = j + 1; k < workDeck.length; k++) { //go through every remaining card for each set of two
        if (setCheck(workDeck[i], workDeck[j], workDeck[k], false)) {
          validSets++
          console.log(workDeck[i] + " " + workDeck[j] + " " + workDeck[k])
        }
      }
    }
  }
  if (validSets > 0) {
    console.log(validSets)
    return false
  } else {
    return true
  }
}

function gameStart() { //init game 
  logpls("Initializing...")
  for (let step = 0; step < 81; step++) { //fill array
    deck[step] = step
  }
  for (step = 0; step < 3; step++) {
    clearSlot(step + 12)
  }
  toggleSpares()
  setCards = []
  setSlots = []
  let scoreNum = document.getElementById("scoreNum")
  scoreNum.innerHTML = "0"
  logpls("Shuffling...")
  shuffle(deck)
  deckDeal() //fill all twelve slots with cards
  logpls("Checking for Cap Set...")
  console.log(capCheck())
  console.log(deck)
  logpls("Success!")
}

function topUp(){ //draws three extra cards
  let a = []
  for (step = 0; step < 15; step++){ //find the three empty slots
	  if (document.getElementById("slot" + step).title == "Empty Slot"){
	    a.splice(1, 0, step) //put them in an array
	  }
  }
  console.log(a)
  
  if (a[2] != undefined){ //proceed only if there are three open slots
    for (step = 0; step < 3; step++){
      cardDraw(deck[deck.length - 1], a[step]) //draw a card into one of the empty slots
	    deck.pop() //pop the card
	  }
  }
}

function cardPick(pos) { //function that's run when a card slot is clicked
  let slot = document.getElementById("slot" + pos)
  if (slot.title == "Empty Slot") {
    logpls("There's no card here!")
  }
  else if (slot.title == setCards[0] || slot.title == setCards[1]) { //disallow reselecting cards
    logpls("This card has already been selected!")
  }
  else {
    if (setCards[1] == undefined) { //check if the working array has room
      logpls("Selected " + slot.title + "...")
      slot.style = "background-color: #ccc;" //change the card bg color to show it's selected
      setSlots[setSlots.length] = slot.id.slice(4)
      setCards[setCards.length] = slot.title //add selected card to the working array
    }
    else { //this happens when a set of three different cards have been selected
      logpls("Selected " + slot.title + "...Checking set...")
      
      document.getElementById("slot" + setSlots[0]).style = "" //set the bg colors of the cards back to #eee
      document.getElementById("slot" + setSlots[1]).style = ""
      
      setCards[setCards.length] = slot.title //add selected card to the working array 
      setSlots[setSlots.length] = slot.id.slice(4)
      console.log(setCards[0] + "," + setCards[1] + "," + setCards[2])
      for (step = 0; step < 3; step++) { //parse the set because forethought is hard
        if (setCards[step].endsWith("s")) {
          setCards[step] = setCards[step].slice(0, -1) //remove the plural
        }
        setCards[step] = setCards[step].split(" ")
      }
      if (setCheck(setCards[0], setCards[1], setCards[2], true)) {
        //remove the cards from the slots and put a new card in
        let workDeck = getHand()
        if (workDeck.length <= 12){ //don't add more cards if there are more than twelve cards out
        if (deck.length < 3) { //if there's not enough cards to replace the set
          let rem = 2
          for (step = deck.length; step > 0; step--) {
            cardDraw(deck[deck.length - 1], setSlots[step])
            deck.pop()
            rem--
          }
          for (step = rem; step > 0; step--) {
            clearSlot(setSlots[step])
          }
        } else {
          for (step = 0; step < 3; step++) { //if there are enough cards then draw three
            cardDraw(deck[deck.length - 1], setSlots[step])
            deck.pop()
          }
        }
        } else {
          for (step = 0;step < 3; step++){ //if there are more than twelve cards out then remove the set
            clearSlot(setSlots[step])
          }
          sortCards()
          toggleSpares()
        }
          let scoreNum = document.getElementById("scoreNum")
          scoreNum.innerHTML = (~~scoreNum.innerHTML) + 1
          console.log(deck)
          console.log(capCheck())
          if (capCheck() == true) { //if there's a cap set
            logpls("No sets are present, drawing more cards...")
            if (deck.length < 3) { //check if the deck is under 3
              topUp()
            } else if (deck.length == 0) {// check if the deck is empty
              logpls("No sets are present, and the deck is empty. Game Over.", "#FF0000")
              return
            }
            else { //this procs when there are three or more cards which can be dealt
              topUp()
            }
            console.log(capCheck())
            if (capCheck() == true) { //this has a really low outcome, so i don't really feel like figuring out what to do here
              logpls("No sets are present with extra cards. Game over.", "#FF0000")
            }
          }
        
        setSlots = []
      }
      while (setCards[0] != undefined) { //clear the working array when done
        setCards.pop()
        setSlots.pop()
      }
    }
  }
}

function sortCards() { //reorders the cards so that all empty slots are at the bottom
  logpls("Reordering Cards...")
  let a = []
  for (step = 14; step >= 0; step--){ //create an array of all of the current card ids in order (skipping empties)
	  if (document.getElementById("slot" + step).title != "Empty Slot"){
	    a.splice(0, 0, document.getElementById("slot" + step).dataset.cardId) //fill the array with the actual card id of all the cards
      clearSlot(step) //clear the slots to ensure there are no duplicates
	  }
  }
  for (step = 0; step < a.length; step++){ //go through the array and redraw the cards to the slots in order
    cardDraw(a[step], step)
  }
  logpls("Reordered Cards!")
}

function toggleSpares(){ //toggles the visibility of the lower three canvases
  let a = 0
  for (step = 12; step < 15; step++){ //check if the lowest slots are empty
    if (document.getElementById("slot" + step).title == "Empty Slot"){
      a++ //a will be 3 if all slots are empty
    }
  }

  if (a == 3 && document.getElementById("slot12").height > 0){ //hide the spares after also checking if they're not already hidden
    logpls("Hiding spare slots...")
    document.getElementById("slot12").height = 0
    document.getElementById("slot13").width = 0
    document.getElementById("slot14").height = 0
  } else if (a < 3 && document.getElementById("slot12").height == 0) { //show the spare slots after checking whether they're not visible and need to be
    logpls("Showing spare slots...")
    document.getElementById("slot12").height = 180
    document.getElementById("slot13").width = 360
    document.getElementById("slot14").height = 180
  }
}