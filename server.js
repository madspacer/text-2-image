// server.js
// where your node app starts

// init project
 
const Canvas = require('canvas')
const express = require('express')
const app = express()

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
/*
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})
*/

app.get("/", (request, response) => {
  // response.sendFile(__dirname + '/views/index.html')
  var canvas = draw();
  var stream = canvas.createPNGStream();
  response.type("png");
  stream.pipe(response);
})

function draw() {
  var canvas = Canvas.createCanvas(600, 600);
  var ctx = canvas.getContext('2d');
  
  ctx.fillStyle = '#1B98E0'
  ctx.rect(0, 0, canvas.width, canvas.height)
  ctx.fill()
  
  /*
  ctx.fillStyle = '#E8F1F2'
  ctx.font = '30px Impact';
  ctx.rotate(0.0);
  ctx.fillText('Awesome!', 50, 100);
  */
  
  ctx.font = 'serif';
  ctx.fillStyle = '#E8F1F2'
  
  const drawMultilineText = require('canvas-multiline-text')

  const fontSizeUsed = drawMultilineText(
    canvas.getContext('2d'),
    "Please could you stop the noise, I'm trying to get some rest from all the unborn chicken voices in my head. What's that? What's that?",
    {
      rect: {
        x: 10,
        y: 10,
        width: canvas.width - 20,
        height: canvas.height - 20
      },
      font: 'arial bold',
      /* font: 'bold 50px sans-serif', */
      verbose: true,
      lineHeight: 1.3,
      minFontSize: 21,
      maxFontSize: 31
    }
  )

  return canvas;
}

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  
  Canvas.registerFont(__dirname + '/assets/BarlowSemiCondensed-Medium.ttf', {family: 'pfennigFont'})
  
  console.log(`Your app is listening on port ${listener.address().port}`)
})
