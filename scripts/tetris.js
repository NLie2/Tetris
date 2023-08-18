//*CLASSES
//Stone super-class
class Stone{
  constructor(position, name){
    this.position = position += width // determines angle around which stone is turned. + starting position 
    this.positions = [this.position, 0, 0, 0] //array of numbers that depend on shape of stone 
    this.infoPositions = [0,0,0,0]
    this.rotations = [[this.position, 0, 0, 0], [this.position, 0, 0, 0], [this.position, 0, 0, 0], [this.position, 0, 0, 0] ]
    this.name = name
  }
  addStoneToInfo(){
    this.infoPositions.forEach(p => infoCells[p].classList.add(this.name))
  }
  removeStoneFromInfo(){
    this.infoPositions.forEach(position => infoCells[position].classList.remove(this.name)) //removes a color corresponding to a certain stone to a cell
  }

  addStone(){
    this.positions.forEach(p => cells[p].classList.add(this.name)) //adds a color corresponding to a certain stone to a cell
  }

  removeStone(){
    this.positions.forEach(position => cells[position].classList.remove(this.name)) //removes a color corresponding to a certain stone to a cell
  }

  addToPile(){
    this.removeStone()
    this.positions.forEach(position => cells[position].classList.add('pile')) //adds stone to grey-coloured 'pile' once it hits the bottom of the grid
  }

  //moves entire stone one row down
  moveDown(){
    if(!this.positions.some(position => boardBottomBorder.includes(position))){
      this.position += width
      const newPositions = this.positions.map(block => block + width)
      this.removeStone()
      this.positions = newPositions
      this.addStone()
    }
  }


 //moves entire stone one row to the right
  moveRight(){
    if(!this.positions.some(position => boardRigthBorder.includes(position))){
      this.position ++
      const newPositions = this.positions.map(block => block +1)
      this.removeStone()
      this.positions = newPositions
      this.addStone()
    }

  }

  //moves entire stone one row to the left
  moveLeft(){
    if(!this.positions.some(position => boardLeftBorder.includes(position))){
      this.position --
      const newPositions = this.positions.map(block => block -1)
      this.removeStone()
      this.positions = newPositions
      this.addStone()
    }
  }

  //rotates stone to the right around the 'position'- anchor
  rotate(){
    //!Alternative: if rotation is not eligible, skip two rotations ahead
    if(this.rotationEligible()) {
      this.updateRotations()

      //current rotation is an index that selects from an array of possible rotations. 
      //Not all stones have the same number of possible rotations, so we need to check that the index remains within the range of the possible rotations. 
      //With every rotation, the stone is moved one to the right. 
      const newRotation = this.currentRotation <= this.possibleRotations-1 ? this.currentRotation+1 : 0 
      const newPositions = this.rotations[newRotation]

      this.removeStone() //stone class must be removed from old cells
      this.positions = newPositions
      this.currentRotation = newRotation
          
      this.updateRotations() //new positions of cells depends on the unique shape of each stone

      this.addStone() //stone class must be added to new cells
    }
  }

}

//7 subclasses of stone that all have a different update-rotate function
class O extends Stone{
  constructor(position, name){
    super(position, name)
    this.possibleRotations = 1 //square-shaped stone only has one possible rotation
    this.rotations = [[this.position, this.position+1, this.position+width, this.position+width+1]]
    this.positions = this.rotations[0]
    this.infoPositions = [5,6,9,10]
  }
  rotationEligible(){
    return false
  }

  updateRotations(){
    this.rotations = [[this.position, this.position+1, this.position+width, this.position+width+1]]
  }

}

class T extends Stone{
  constructor(position, name){
    super(position, name)
    this.possibleRotations = 3
    this.rotations = [[this.position, this.position- width, this.position+1, this.position+width], 
    [this.position, this.position+1, this.position+width, this.position-1], 
    [this.position, this.position+width, this.position-width, this.position-1], 
    [this.position, this.position-1, this.position+1, this.position-width]]

    this.positions = this.rotations[0]
    this.infoPositions = [5,9,10,13]

    this.currentRotation = 0
  }
  
  //rotationEligible function checks whether stone is next to a border. Some rotatotions are not possible next to a border. 
  rotationEligible(){
    if(this.currentRotation === 0 && this.positions.some(position => this.positions.some(position => boardLeftBorder.includes(position)))){
      return false
    }
    if(this.currentRotation === 2 && this.positions.some(position => this.positions.some(position => boardRigthBorder.includes(position)))){
      return false
    }

    return true
  }

  //updates rotations one to the right around the position-variable, which functions as an anchor.
  updateRotations(){
  this.rotations = [[this.position, this.position- width, this.position+1, this.position+width], 
                    [this.position, this.position+1, this.position+width, this.position-1], 
                    [this.position, this.position+width, this.position-width, this.position-1], 
                    [this.position, this.position-1, this.position+1, this.position-width]]
  }

}

class I extends Stone{
  constructor(position, name){
    super(position, name)
    this.possibleRotations = 1
    this.rotations = [[this.position, this.position-width, this.position+width, this.position+width*2], 
                      [this.position, this.position+1, this.position-1, this.position-2]]
    this.positions = this.rotations[0]
    this.infoPositions = [1,5,9,13]
    this.currentRotation = 0

  }

  rotationEligible(){
    if(this.positions.some(position => boardRigthBorder.includes(position) || this.positions.some(position => boardLeftBorder.includes(position) || boardLeftBorder.map(cell => cell +1).includes(position)))){
      return false
    }
    return true
  }
  
  updateRotations(){
      this.rotations = [[this.position, this.position-width, this.position+width, this.position+width*2], 
      [this.position, this.position+1, this.position-1, this.position-2]]
  }
}

class J extends Stone{
  constructor(position, name){
    super(position, name)
    this.position = position+width+1
    this.possibleRotations = 3
    this.rotations = [[this.position, this.position-width, this.position+width, this.position+width-1], 
                      [this.position, this.position+1, this.position-1, this.position-width-1], 
                      [this.position, this.position-width+1, this.position-width, this.position+width],
                      [this.position, this.position+width, this.position-width, this.position+width+1]]
    this.positions = this.rotations[0]
    this.infoPositions = [6,10,14,13]
    this.currentRotation = 0

  }

  rotationEligible(){
    if(this.currentRotation === 0 && this.positions.some(position => this.positions.some(position => boardRigthBorder.includes(position)))){
      return false
    }

    return true
  }

  
  updateRotations(){
    this.rotations = [[this.position, this.position-width, this.position+width, this.position+width-1], 
                      [this.position, this.position+1, this.position-1, this.position-width-1], 
                      [this.position, this.position-width+1, this.position-width, this.position+width],
                      [this.position, this.position-1, this.position+1, this.position+width+1]]
  }

}

class L extends Stone{
  constructor(position, name){
    super(position, name)
    this.position = position+width

    this.possibleRotations = 3
    this.rotations = [[this.position, this.position-width, this.position+width, this.position+1+width], 
                      [this.position, this.position+1, this.position+width-1, this.position-1], 
                      [this.position, this.position-width, this.position-width-1, this.position+width],
                      [this.position, this.position-1, this.position+1, this.position-width+1]]
    this.positions = this.rotations[0]
    this.infoPositions = [5,9,13,14]
    this.currentRotation = 0
  }

  rotationEligible(){
    if(this.currentRotation === 0 && this.positions.some(position => this.positions.some(position => boardLeftBorder.includes(position)))){
      return false
    }

    return true
  }
  
  updateRotations(){
    this.rotations = [[this.position, this.position-width, this.position+width, this.position+1+width], 
                      [this.position, this.position+1, this.position+width-1, this.position-1], 
                      [this.position, this.position-width, this.position-width-1, this.position+width],
                      [this.position, this.position-1, this.position+1, this.position-width+1]]
  }

}

class S extends Stone{
  constructor(position, name){
    super(position, name)
    this.position = position+width

    this.possibleRotations = 1
    this.rotations = [[this.position, this.position-width, this.position-width+1, this.position-1], 
                      [this.position, this.position-width, this.position+1, this.position+width+1]]

    this.positions = this.rotations[0]
    this.infoPositions = [5,9,10,14]

    this.currentRotation = 0
  }

  rotationEligible(){
    if(this.currentRotation === 1 && this.positions.some(position => this.positions.some(position => boardLeftBorder.includes(position)))){
      return false
    }

    return true
  }

  updateRotations(){
    this.rotations = [[this.position, this.position-width, this.position-width+1, this.position-1], 
                      [this.position, this.position-width, this.position+1, this.position+width+1]]
  }

}
class Z extends Stone{
  constructor(position, name){
    super(position, name)
    this.possibleRotations = 1
    this.rotations = [[this.position, this.position-width, this.position-width-1, this.position+1], 
                      [this.position, this.position-width, this.position-1, this.position+width-1]]
    this.positions = this.rotations[0]
    this.infoPositions = [6,10,9,13]
    this.currentRotation = 0
  }

  rotationEligible(){
    if(this.currentRotation === 1 && this.positions.some(position => this.positions.some(position => boardRigthBorder.includes(position)))){
      return false
    }

    return true
  }

  updateRotations(){
    this.rotations = [[this.position, this.position-width, this.position-width-1, this.position+1], 
                      [this.position, this.position-width, this.position-1, this.position+width-1]]
  }
}
this.infoPositions = [5,9,10,14]

const stones = {
  o: O, 
  t: T, 
  i: I, 
  l: L, 
  j: J, 
  s: S, 
  z: Z
}

//! Make turning possible on all borders
//! Add more messages to the player and display them at random 
//! Try to make the dropping down of rows look more like a quick 'moving down'
//! Add a fun sound when the game starts, but give the player the option to not hear it. 
//! If you have time, try to figure out if the compress pile function is working in the correct way

//*BOARD
// Board variables
const width = 8
const cellCount= width * width
const cells = []

//Board elements
const grid = document.querySelector('.board')
const startButton = document.querySelector('#start-game')
const controls = document.querySelectorAll('.controls > *')

//CurrentStoneInfo
const currentStoneInfo  = document.getElementById('currentBlock')
const infoCells = []

//Usage info
const usageInfo = document.getElementById("info")
console.log(usageInfo)

// Generate the cells
function generateGrid(boardWidth, container, nrOfCells, cellsArray){
  container.innerHTML = ''
  for(let i=0; i< nrOfCells; i++){  
    const cell = document.createElement('DIV')
  
    cell.classList.add('cell')
  
    cell.style.width = `${100/ boardWidth}%`
    cell.style.height = `${100/ boardWidth}%`

    cell.dataset.index = i

    container.append(cell)
    cellsArray.push(cell)
  }
}

generateGrid(width, grid, cellCount, cells)  //Generate grid for player Info
generateGrid(4, currentStoneInfo, 16, infoCells)  //Generate grid to see current (or next) stone

let rows = getRows(cells, width) 
let rowNumbers = getRows(cells.map(c=> parseInt(c.getAttribute('data-index'))), width) //!REFACTOR SO THAT GET COLLUMN AND GETROWS FUNCTIONS ARE MORE SIMILAR
let collumns = getCollumns(cells, width)[0] 
let collNumbers = getCollumns(cells, width)[1]


let boardTopBorder = rowNumbers[0]
let boardBottomBorder = rowNumbers[width-1]
let boardLeftBorder = collNumbers[0]
let boardRigthBorder = collNumbers[width-1]


let borders = [boardTopBorder,boardBottomBorder, boardLeftBorder,boardRigthBorder]


//*GAME
// * GLOBALS

let interval
let score = 0
let highscore = score 

//stone variables
let currentStone
let nextStone
let curretStoneType
let startPosition = 3
let runningGame 

let nextStoneType = chooseStone()
console.log(nextStoneType)


//Keycodes
//to move stone
const down = 40
const left = 37
const right = 39

//to rotate stone
const space = 32


//* ELEMENTS

//PLayerInfo
const h3= document.querySelectorAll('h3');
const h4= document.querySelectorAll('h4');
const currentBlock = document.getElementById('currentBlock');
currentBlock.style.display = 'none';
[...h3, ...h4].forEach(heading => heading.style.display = 'none')



const scoreDisplay = document.getElementById('current-score') //Displays the score
const highscoreDisplay = document.getElementById('high-score') //Displays the high- score
const messageToPlayer = document.querySelector('h1') //"Welcome", "Well done!"", and "Game over!"


//* EXECUTIONS


function getRows(arr,n){ //!I looked this function up on stackoverflow
  var chunkLength = Math.max(arr.length/n ,1);
  var chunks = [];
  for (var i = 0; i < n; i++) {
      if(chunkLength*(i+1)<=arr.length)chunks.push(arr.slice(chunkLength*i, chunkLength*(i+1)));
  }  

  return chunks; 
}

function getCollumns(arr, n){
  const colls = []
  const collNums = []
  for(let i = 0; i <= n; i++){
    colls.push(arr.filter(c => c.getAttribute('data-index') % width === i ))
    collNums.push(arr.filter(c => c.getAttribute('data-index') % width === i ).map(c => parseInt(c.getAttribute('data-index'))))
  }

  return [colls, collNums]
}

function playStone(){
    runningGame = true
    //clear existing interval 
    if(interval){
      clearInterval(interval)
    }
    //remove previousStone
    if(currentStone){
      currentStone.removeStone() //remove the stone class from cells
      currentStone.removeStoneFromInfo() 
    }

    usageInfo.style.display = 'none'
    //prevent startButton from being pressed
    startButton.setAttribute('disabled', 'true') 
    startButton.style.display = 'none'

    //Show player-info 
    currentBlock.style.display = 'flex';
    [...h3, ...h4].forEach(heading => heading.style.display = 'inline')


    messageToPlayer.innerText = ''

    //to choose next stone
    currentStoneType = nextStoneType
    nextStoneType = chooseStone()

    nextStone = new stones[nextStoneType](startPosition, nextStoneType)
    currentStone = new stones[currentStoneType](startPosition, currentStoneType)

    //Add current stone to board 
    nextStone.addStoneToInfo()
    currentStone.addStone()

    interval = setInterval(()=> {  

    //creates new stone Object at starting position
    currentStone.moveDown() //move stone one cell down every second
  
      //If the stone hits the bottom border, it should be added to the pile.
      if(currentStone.positions.some(position => boardBottomBorder.includes(position))){
        currentStone.addToPile() 
        //if the top of the currentStone hits the top of the grid, the game is over
        redefineBorders() //the sides of the stone become the new borders of the grid once it is added to the pile.
        if(boardTopBorder.includes(Math.min(...currentStone.positions))){
          gameOver()
        } 

        nextStone.removeStoneFromInfo()
        nextStone = null
        currentStone = null //remove current stone from program (this is not the same as removing it from the board!)

        let fullRows = checkRows() //check if any of the rows all contain class of pile. If so, the player gets 10 points, and the row is removed. 
        if(fullRows.length > 0){
          setTimeout(function(){
            const messages = ["Well done! 😀", "Divine! 👼", "Awesome! 😎", "Nice! 🤯", "Smashed it! 🔥", "Super! 👍", "Nice work! 😎"]
            messageToPlayer.innerText = messages[Math.floor(Math.random() * messages.length)]
          }, 20)
        }

        fullRows.forEach(function(rowIdx){
            if (rowIdx> 0 ){
              removeRow(rowIdx)
              redefineBorders()

              score += 10 
              compressPile(Math.max(...fullRows), fullRows.length)
              redefineBorders()
            }
          })
        fullRows = []

        scoreDisplay.innerText = `Score ${score}`

        if(runningGame){
          playStone()
        }
      } 


    }, 1000)
  }

  //moveStone function responds the the left, right an down keys.
  function moveStone(evt){
    if(currentStone){
      if(evt.keyCode === space){
        currentStone.rotate()
      } else if(evt.keyCode === right ) {
        currentStone.moveRight()
      } else if(evt.keyCode === left ) {
        currentStone.moveLeft()
      } else if(evt.keyCode === down) {
        currentStone.moveDown()
      } else{
        console.log('UNDEFINED KEY')
      }
    }
  }
  
  function rotateStoneMobile(){
    currentStone.rotate()
  }

  function moveStoneMobile(evt){
    evt.target.getAttribute('id') === 'right' && currentStone.moveRight()
    evt.target.getAttribute('id') === 'left' && currentStone.moveLeft()
    evt.target.getAttribute('id') === 'down' && currentStone.moveDown()
  }

  function chooseStone(){

    //Optional: Chosses two random indexes from stones array. At the start of the game, and afterwards makes currentStone = nextStone. 
    //Changes picture of current Stone and next Stone. 
    const stoneTypes =["o", "t", "i", "j", "l", "s", "z"]
    return stoneTypes[Math.floor(Math.random()*stoneTypes.length)]
  }


  //Redefine bottom, left and right borders when a stone is added to pile, or when a row has been deleted.
  function redefineBorders(){
    let emptyCells = []

    //remove empty cells from borders (in case a row has been deleted)
    rows.forEach(cells => cells.forEach(cell=> !cell.classList.contains('pile') && emptyCells.push(parseInt(cell.getAttribute('data-index')))))

    //add cells that are not empty to borders
    boardBottomBorder = boardBottomBorder.filter(cell=> !emptyCells.includes(cell) || rowNumbers[width-1].includes(cell))
    borders[1] = boardBottomBorder

    boardRigthBorder = boardRigthBorder.filter(cell=> !emptyCells.includes(cell) || collNumbers[width-1].includes(cell))
    borders[2] = boardLeftBorder

    boardLeftBorder = boardLeftBorder.filter(cell=> !emptyCells.includes(cell) || collNumbers[0].includes(cell))
    borders[3] = boardRigthBorder

    redefineBottomBorder()
    redefineLeftBorder()
    redefineRightBorder()
  }

  function redefineBottomBorder(){
    let newBorder = []

    //adds the upper side of the pile ot the bottom border
    rows.forEach(cells => cells.forEach(cell=> cell.classList.contains('pile') && newBorder.push(parseInt(cell.getAttribute('data-index')) - width)))
    newBorder.forEach(cell => !boardBottomBorder.includes(cell) && boardBottomBorder.push(cell))
    borders[1] = boardBottomBorder
  }

  function redefineLeftBorder(){
    const newBorder = []

    //Adds the right side of the pile to the left border
    collumns.forEach(cells => cells.forEach(cell=> cell.classList.contains('pile') && newBorder.push(parseInt(cell.getAttribute('data-index')) +1)))
    newBorder.forEach(cell => !boardLeftBorder.includes(cell) && boardLeftBorder.push(cell))
    borders[2] = boardLeftBorder
  }

  function redefineRightBorder(){
    const newBorder = []

    //Adds the left side of the pile the right border. 
    collumns.forEach(cells => cells.forEach(cell=> cell.classList.contains('pile') && newBorder.push(parseInt(cell.getAttribute('data-index')) - 1)))
    newBorder.forEach(cell => !boardRigthBorder.includes(cell) && boardRigthBorder.push(cell))
    borders[3] = boardRigthBorder
  }


function compressPile(lowestFullRow, nrFullRows) {

  //loops through all rows above the recently removed row(s)and checks if any of the cells in it are part of pile. 
  //If so, the pile in the cell "falls down" to the lowest free cell in the same column. 
  rows.forEach( function(rowCells, rowIdx) {
    if(rowIdx < lowestFullRow) {
      rowCells.forEach(function (cell, cellIdxInRow){
        if(cell.classList.contains('pile')){
          // newIdx = parseInt(cell.getAttribute('data-index')) + (width * nrFullRows)

          cell.classList.remove('pile') 

          const lowestFreeCellInColl = parseInt(findLowestFreeCellinColl(cellIdxInRow))
          cells[lowestFreeCellInColl].classList.add('pile')
        }
      })
    }
  }
  )
}

function findLowestFreeCellinColl(cellIdxInRow){
  for(let i= width-1; i>=0; i--){ //loops through all cells in the same column, starting from the bottom
    if(!rows[i][cellIdxInRow].classList.contains('pile')){ //checks if any of the cells contain the class of "pile"
      return rows[i][cellIdxInRow].getAttribute('data-index')
    }
  }
}

//Function that checks whether all stones in a row have class pile, and removes that row, if it is the case
function removeRow(idx) {
  rows[idx].forEach(cell => cell.classList.remove('pile'))

}

function checkRows() {
  //checks if any of the rows in the grid are "full" and can be removed from the pile. 
  const fullRows = []

  rows.forEach(
    function(cells, idx){
      if(cells.every(cell => cell.classList.contains('pile')) && idx > 0){
        fullRows.push(idx)
      }
    })
  return fullRows //returns to-be-removed-rows
}

function gameOver(){
  clearInterval(interval)
  messageToPlayer.innerText = "Game Over! 💀"
  messageToPlayer.innerText 
  runningGame = false
  const beatHighScore = score > highscore
  console.log(beatHighScore)
  if (beatHighScore){
    highscore = score
  }

  setTimeout(function(){
    messageToPlayer.innerText = beatHighScore ? `New high-score ${highscore} \n Can you do better? 🤓` : `Better luck next time! \n Beat your high-score ${highscore} 💪`
    currentBlock.style.display = 'none';
    [...h3, ...h4].forEach(heading => heading.style.display = 'none')
    startButton.style.display = 'inline'

  }, 2000)

  setTimeout(function(){ 
    //set everything back to starting values 
    messageToPlayer.innerText = "Press the start-button to start over"
    currentStone = null 
    cells.forEach(cell => cell.classList.remove('pile'))
    redefineBorders()
    score = 0
    scoreDisplay.innerText = `Score ${score}`
    highscoreDisplay.innerText = `Highscore: ${highscore}`
    startButton.removeAttribute('disabled') 
  }, 5000)

}

//* EVENTS
document.addEventListener('keydown', moveStone)
startButton.addEventListener('click', playStone)
grid.addEventListener('touchend', rotateStoneMobile)
controls.forEach( control => control.addEventListener('touchend', moveStoneMobile))
