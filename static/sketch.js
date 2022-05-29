
window.currentMessage = 0;

let submitBttn, inputField;
let inputs = [];
let responses = [];
let lineH = 25;
let msgSpace = 45;
let responseW;
let roboto;
let intro = "Can we talk about the political, economical, and environmental state of the world?"
let greenBg;
let corgi;
let pfp

function preload() {
  //roboto = loadFont("static/assets/Roboto-Regular.ttf");
  greenBg = loadImage('static/green bg.png');
  corgi = loadImage('static/corgi.png');
  pfp = loadImage('static/pfp.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  responses.push(intro);
  
  if (width > 1200) {
    responseW = width/4;
  } else {
    responseW = width/3;
  }
  
  chatX = width * 0.38;
  chatY = height * 0.05;
  
  submitX = width * 0.95 - 70;

  inputField = createInput();
  inputField.position(chatX, height * 0.85);
  inputField.size(submitX - chatX - 50, 50);
  inputField.style('border-radius', '15px');
  inputField.style('border', '1px solid black');
  inputField.style('padding', '0 10px');
  inputField.style('font-family', "'Roboto', sans-serif");
  inputField.style('font-size', '18px');

  submitBttn = createButton("send");
  submitBttn.position(submitX, height * 0.85);
  submitBttn.size(70, 55);
  submitBttn.mousePressed(chat);
  submitBttn.style('background-color', 'white');
  submitBttn.style('border-radius', '15px');
  submitBttn.style('border', 'none');
  submitBttn.style('font-family', "'Roboto', sans-serif");
  submitBttn.style('font-size', '18px');
  submitBttn.style('background-color', '#fcedf3');
  
}
// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   responses.push(intro);
  
//   if (width > 1200) {
//     responseW = width/3;
//   } else {
//     responseW = width/2;
//   }

//   inputField = createInput();
//   inputField.position(width * 0.05, height * 0.85);
//   inputField.size(width * 0.95 - 150, 50);
//   inputField.style('border-radius', '15px');
//   inputField.style('border', '1px solid black');
//   inputField.style('padding', '0 10px');
//   inputField.style('font-family', "Roboto");
//   inputField.style('font-size', '18px');

//   submitBttn = createButton("send");
//   submitBttn.position(width * 0.95 - 80, height * 0.85);
//   submitBttn.size(80, 55);
//   submitBttn.mousePressed(chat);
//   submitBttn.style('background-color', 'white');
//   submitBttn.style('border-radius', '15px');
//   submitBttn.style('border', '1px solid black');
//   submitBttn.style('font-family', "Roboto");
//   submitBttn.style('font-size', '18px');
  
// }


// function draw() {
//   fill(255);
//   rect(0, 0, width, height);  // white overlay
  
//   fill(0);
//   textFont("Roboto");
//   textSize(18);
//   textLeading(20);
  
//   let chatsH = 0;
  
//   // draw all responses and white rects behind them
//   for (let i = 0; i < responses.length; i++) {
//     // responses[i]
//     fill(255);
//     strokeWeight(0.4);
//     let resLines = numLines(responses[i], responseW - 36);
//     // console.log(resLines);
    
//     rect(width * 0.05, 
//          height * 0.05 + chatsH + (i * msgSpace), 
//          responseW, 
//          resLines * lineH + 15,
//          10);
    
//     fill(0);
    
//     text(responses[i], 
//          width * 0.05 + 10, 
//          height * 0.05 + chatsH + 10 + (i * msgSpace), 
//          responseW - 10);
    
//     chatsH += resLines * lineH;
    
//     // splice oldest response when we run out of space
//     if(chatsH > height * 0.5) {
//       chatsH -= numLines(responses[0]) * lineH;
//       responses.splice(0,1);
//       chatsH -= numLines(inputs[0]) * lineH;
//       inputs.splice(0,1);
//     }
    
//     // inputs[i]
//     if (inputs[i]) {
//       fill(255);
//       strokeWeight(0.4);
//       let inputLines = numLines(inputs[i], responseW - 35);
//       // console.log(inputLines);
//       chatsH += inputLines * lineH;

//       rect(width * 0.95 - responseW, 
//            height * 0.05 + chatsH + (i * msgSpace), 
//            responseW, 
//            inputLines * lineH + 15,
//            10);

//       fill(0);

//       text(inputs[i], 
//            width * 0.95 - responseW + 10, 
//            height * 0.05 + chatsH + 10 + (i * msgSpace), 
//            responseW - 10);

//       }
//     }

// }
function draw() {
  fill(255);
  rect(0, 0, width, height);
  
  drawingContext.shadowBlur = 0;
  image(greenBg, 0, 0, width * 0.35, height);
  imageMode(CENTER);

  corgi.resize(width * 0.3, 0);
  image(corgi, width * 0.175, height * 0.4);
  
  
  fill(255, 216, 228);
  textSize(30);
  textAlign(CENTER);
  textSize(width/22)
  text('sustainabot', width * 0.175, height * 0.4 + corgi.height * 0.7);
  
  imageMode(CORNER);
  textAlign(LEFT);
  
  fill(0);
  textFont("Roboto");
  textSize(18);
  textLeading(20);
  
  let chatsH = 0;
  
  // draw all responses and white rects behind them
  for (let i = 0; i < responses.length; i++) {
    // responses[i]
    fill(255, 237, 243);
    noStroke();
    // strokeWeight(0.4);
    let resLines = numLines(responses[i], responseW - 36);
    
    image(pfp, chatX - 10, chatY + chatsH + (i * msgSpace), 45, 40);
    
    rect(chatX + 50, 
         chatY + chatsH + (i * msgSpace), 
         responseW, 
         resLines * lineH + 15,
         10);
    
    fill(0);
    
    text(responses[i], 
         chatX + 60, 
         chatY + chatsH + 15 + (i * msgSpace), 
         responseW - 10);
    
    chatsH += resLines * lineH;
    
    // splice oldest response when we run out of space
    if(chatsH > height * 0.5) {
      chatsH -= numLines(responses[0]) * lineH;
      responses.splice(0,1);
      chatsH -= numLines(inputs[0]) * lineH;
      inputs.splice(0,1);
    }
    
    // inputs[i]
    if (inputs[i]) {
      fill(240);
      strokeWeight(0.4);
      let inputLines = numLines(inputs[i], responseW - 35);
      chatsH += inputLines * lineH;

      rect(width * 0.98 - responseW, 
           chatY + chatsH + (i * msgSpace), 
           responseW, 
           inputLines * lineH + 15,
           10);

      fill(0);
      text(inputs[i],
           width * 0.98 - responseW + 10, 
           chatY + chatsH + 15 + (i * msgSpace),
           responseW - 10);
      }
    }

}

function numLines(message, width) {
  newLines = message.split("\n").length-1;
  if (newLines > 5){
    return newLines;
  }

  console.log(textWidth(message) / width);
  return ceil(textWidth(message) / width);
}

function chat() {
  let input = inputField.value();
  if (window.currentMessage === 3)
    return
  inputs.push(input);
  responses.push("💬")
    http = new XMLHttpRequest();
    http.open("POST", "/", true)
    http.setRequestHeader("Content-Type", "application/json")

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText)
            responses.pop()
            respond(response.message)
            window.currentMessage = response.id;
        }
    }
    message = {
        content: input,
        id: window.currentMessage
    }
    http.send(JSON.stringify(message));
   

  inputField.value('');
//   HERE IS WHERE WE GET THE REPLY
}

function respond(reply) {
  responses.push(reply);

}
function loaded() {
  console.log("Chatbot ready!");
  bot.sortReplies(); //You must sort the replies before trying to fetch any!
}
function error(error) {
  console.log("There is an error.");
  console.log(error);
}

function keyPressed(){
  if (keyCode===ENTER){
    chat();
  }
}



// form = document.getElementById('form');
// form.onsubmit = function(event) {
//     event.preventDefault()
    
//     http = new XMLHttpRequest();
//     http.open("POST", "/", true)
//     http.setRequestHeader("Content-Type", "application/json")

//     http.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//           response = JSON.parse(this.responseText)
//           console.log(response.message)
//           window.currentMessage = response.id;
//         }
//     }
//     message = {
//         content: event.target.elements[0].value,
//         id: window.currentMessage
//     }
    
//     http.send(JSON.stringify(message));
//     event.target.elements[0].value = '';
    

// }
        

        