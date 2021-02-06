let H = '👽'
let T = '🦅'
let coins = [];
//let log;
let turncnt = 0;
let winmoveorder = [all, diag, all, side, all, diag, all, single, all, diag, all, side, all, diag, all];
let myturncnt = 0
let latestmove = 'nothing';
let devilface = '😈'
let actionbtn



function setup() {
  createCanvas(600, 400);
  //frameRate(5); 

  //filling in the array with coins
  for (let i = 0; i < 4; i++)
    coins[i] = random([H, T]);
  if (coins[0] == T && coins[1] == T && coins[2] == T && coins[3] == T)
    coins[random([0, 1, 2, 3])] = H

  //creating signature
  label3 = createP('');
  label3.style('color', '#888').position(width + 2, 0);


  //adding buttons
  newbtn = createButton('New random setup');
  newbtn.mousePressed(reset);
  newbtn.position(width + 2, 50);

  actionbtn = createButton('Next Turn');
  actionbtn.position(width + 2, 80).mousePressed(function() {
    nextTurn();
  });


  labelmanual = createP('');
  labelmanual.style('color', '#888').position(width + 2, 100);
  labelmanual.html('Manual moves:');
  radio1 = createRadio('Manual').style('color', '#888');
  radio1.option('ON');
  radio1.option('OFF');
  radio1.style("width", "100px").style('checked', '0');
  radio1.selected('OFF');
  radio1.position(width + 2, 140);

  allbtn = createButton('All');
  singlebtn = createButton('Single');
  sidebtn = createButton('Side');
  diagbtn = createButton('Diagonal');
  tablebtn = createButton('Table turn');

  allbtn.attribute('disabled', '');
  singlebtn.attribute('disabled', '');
  sidebtn.attribute('disabled', '');
  diagbtn.attribute('disabled', '');
  tablebtn.removeAttribute('disabled');

  allbtn.mousePressed(function() {
    all();
    allbtn.attribute('disabled', '');
    singlebtn.attribute('disabled', '');
    sidebtn.attribute('disabled', '');
    diagbtn.attribute('disabled', '');
    tablebtn.removeAttribute('disabled');
  }).position(width + 2, 175);
  singlebtn.mousePressed(function() {
    single();
    allbtn.attribute('disabled', '');
    singlebtn.attribute('disabled', '');
    sidebtn.attribute('disabled', '');
    diagbtn.attribute('disabled', '');
    tablebtn.removeAttribute('disabled');
  }).position(width + 2, 200);
  sidebtn.mousePressed(function() {
    side();
    allbtn.attribute('disabled', '');
    singlebtn.attribute('disabled', '');
    sidebtn.attribute('disabled', '');
    diagbtn.attribute('disabled', '');
    tablebtn.removeAttribute('disabled');
  }).position(width + 2, 225);
  diagbtn.mousePressed(function() {
    diag();
    allbtn.attribute('disabled', '');
    singlebtn.attribute('disabled', '');
    sidebtn.attribute('disabled', '');
    diagbtn.attribute('disabled', '');
    tablebtn.removeAttribute('disabled');
  }).position(width + 2, 250);
  tablebtn.mousePressed(function() {
    tableturn();
    allbtn.removeAttribute('disabled', '');
    singlebtn.removeAttribute('disabled', '');
    sidebtn.removeAttribute('disabled', '');
    diagbtn.removeAttribute('disabled', '');
    tablebtn.attribute('disabled', '');
  }).position(width + 2, 275);

  labelgame = createP('');
  labelgame.style('color', '#888').position(width + 2, 300);
  labelgame.html('Hide coins?');
  radio2 = createRadio('Gameplay').style('color', '#888');
  radio2.option('YES');
  radio2.option('NO');
  radio2.style("width", "100px").style('checked', '0');
  radio2.position(width + 2, 340);

}


function nextTurn() {
  console.log('----Current state: ' + coins[0] + coins[1] + coins[2] + coins[3] + '----')
  tableturn();
  winmoveorder[myturncnt]();
  myturncnt++;

}

function tableturn() {
  let rand = random([1, 2, 3])
  if (random([true, false])) {
    for (let i = 0; i < rand; i++) {
      temp = coins[3];
      coins[3] = coins[2];
      coins[2] = coins[1]
      coins[1] = coins[0]
      coins[0] = temp;
    }
  }
  //hide coins
  switch (radio2.value()) {
    case 'NO':
      latestmove = 'nothing. Turned the table ' + rand + ' times'
      break;
    case 'YES':
      latestmove = 'none. Devil made his move.. maybe'

      break;
  }

  console.log('The devil turned the table ' + rand + ' times')
  //noLoop()

}

// flip all coins
function all() {
  for (let i = 0; i < 4; i++) {
    if (coins[i] == H)
      coins[i] = T
    else if (coins[i] == T)
      coins[i] = H
  }

  turncnt++;
  latestmove = 'all coins (ALL)'
  console.log('MOVE ' + turncnt + '. flipped all')
  checkwin();
}

//flip 9
function single() {
  if (coins[3] == H) //doesnt check!
    coins[3] = T
  else if (coins[3] == T)
    coins[3] = H

  turncnt++;
  latestmove = 'left coin (SINGLE)'
  console.log('MOVE ' + turncnt + '. flipped 9')
  checkwin();
}

//flip 9 and 6
function side() {
  if (coins[3] == H)
    coins[3] = T
  else if (coins[3] == T)
    coins[3] = H

  if (coins[2] == H)
    coins[2] = T
  else if (coins[2] == T)
    coins[2] = H

  turncnt++;
  latestmove = 'left and bottom coins (SIDE)'
  console.log('MOVE ' + turncnt + '. flipped 9 and 6')
  checkwin();
}

//flip 9 and 3
function diag() {
  if (coins[3] == H)
    coins[3] = T
  else if (coins[3] == T)
    coins[3] = H

  if (coins[1] == H)
    coins[1] = T
  else if (coins[1] == T)
    coins[1] = H
  checkwin();
  turncnt++;
  latestmove = 'left and right coins (DIAGONAL)'
  console.log('MOVE ' + turncnt + '. flipped 9 and 3')
  checkwin();
}

function reset() {
  for (let i = 0; i < 4; i++)
    coins[i] = random([H, T]);
  if (coins[0] == T && coins[1] == T && coins[2] == T && coins[3] == T)
    coins[random([0, 1, 2, 3])] = H
  //log = '';
  turncnt = 0;
  myturncnt = 0;
  latestmove = 'none';
  devilface = '😈'
  actionbtn.removeAttribute('disabled');
  tablebtn.removeAttribute('disabled', '');

  console.log('NEW GAME')

}

function checkwin() {

  if (coins[0] == T && coins[1] == T && coins[2] == T && coins[3] == T) {
    //let congrats = createP('');
    //congrats.style('color','#888')//.position(width+20,0);
    //congrats.html('Congratulations! You won!');
    devilface = '👿'
    console.log('WIN')


  }

}

function draw() {
  background(255);
  //drawing table
  strokeWeight(0);
  fill(75.7, 60.4, 42);
  circle(width / 2, height / 2, 300);



  fill(0, 0, 0);
  textSize(15);
  textAlign(LEFT);
  text('Latest move: ' + turncnt + ' - flipped ' + latestmove, 5, height - 20);

  //drawing coins
  strokeWeight(2);
  textSize(32);
  textAlign(CENTER);
  ellipseMode(CENTER);
  text(devilface, width / 2, 35);

  //coin top 12
  fill(150, 150, 150);
  ellipse(width / 2, height / 2 - 50, 50);
  fill(0, 0, 0);
  text(coins[0], width / 2, height / 2 - 39);

  //coin right 3
  fill(150, 150, 150);
  ellipse(width / 2 + 50, height / 2, 50);
  fill(0, 0, 0);
  text(coins[1], width / 2 + 50, height / 2 + 9);

  //coin bottom 6 
  fill(150, 150, 150);
  ellipse(width / 2, height / 2 + 50, 50);
  fill(0, 0, 0);
  text(coins[2], width / 2, height / 2 + 59);

  //coin left 9
  fill(150, 150, 150);
  ellipse(width / 2 - 50, height / 2, 50);
  fill(0, 0, 0);
  text(coins[3], width / 2 - 50, height / 2 + 9);

  switch (radio1.value()) {
    case 'ON':
      allbtn.show();
      singlebtn.show();
      sidebtn.show();
      diagbtn.show();
      tablebtn.show();
      actionbtn.attribute('disabled', '');
      break;
    case 'OFF':
      allbtn.hide();
      singlebtn.hide();
      sidebtn.hide();
      diagbtn.hide();
      tablebtn.hide();
      actionbtn.removeAttribute('disabled', '');
      break;
  }

  switch (radio1.value()) {
    case 'OFF':
      radio2.hide()
      labelgame.hide()
      radio2.selected('NO');
      break;
    case 'ON':
      radio2.show()
      labelgame.show()
      radio2.selected('YES');

      break;
  }

  //show coins?
  switch (radio2.value()) {
    case 'NO':
      //coin top 12
      fill(150, 150, 150);
      ellipse(width / 2, height / 2 - 50, 50);
      fill(0, 0, 0);
      text(coins[0], width / 2, height / 2 - 39);

      //coin right 3
      fill(150, 150, 150);
      ellipse(width / 2 + 50, height / 2, 50);
      fill(0, 0, 0);
      text(coins[1], width / 2 + 50, height / 2 + 9);

      //coin bottom 6 
      fill(150, 150, 150);
      ellipse(width / 2, height / 2 + 50, 50);
      fill(0, 0, 0);
      text(coins[2], width / 2, height / 2 + 59);

      //coin left 9
      fill(150, 150, 150);
      ellipse(width / 2 - 50, height / 2, 50);
      fill(0, 0, 0);
      text(coins[3], width / 2 - 50, height / 2 + 9);

      break;
    case 'YES':
      //coin top 12
      fill(150, 150, 150);
      ellipse(width / 2, height / 2 - 50, 50);


      //coin right 3
      fill(150, 150, 150);
      ellipse(width / 2 + 50, height / 2, 50);


      //coin bottom 6 
      fill(150, 150, 150);
      ellipse(width / 2, height / 2 + 50, 50);


      //coin left 9
      fill(150, 150, 150);
      ellipse(width / 2 - 50, height / 2, 50);
      break;
  }

  if (devilface == '👿') {
    actionbtn.attribute('disabled', '');
    tablebtn.attribute('disabled', '');
    textAlign(CENTER);
    fill(255, 255, 255, 200)
    noStroke();
    rect(width / 2 - 100, height / 2 - 30, 200, 60);
    fill(200, 0, 0);
    text('YOU WON!!', width / 2, height / 2 + 12);
  } else {
    text(' ', width / 2, height / 2);
  }
  stroke(0);
  //strokeWeight(2);


}
