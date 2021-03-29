$(() => {
  myCanvas.width = 700;
  myCanvas.height = 600;
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  function displayAxis() {
    ctx.strokeStyle = 'black'
    ctx.beginPath()
    ctx.moveTo(18, 18)
    ctx.lineTo(18, myCanvas.height - 18)
    ctx.lineTo(myCanvas.width - 20, myCanvas.height - 18)
    ctx.lineWidth = 3
    ctx.stroke()
  }



  function plotPoints(val, /*  val2, */ limit) {

    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)

    ctx.beginPath()
    ctx.moveTo(20, myCanvas.height - 20)

    /* console.log(val.length) */
    for (let i = 0; i < val.length; i++) {
      /* console.log([
        [i], val[i], val[i] / limit, val[i] / limit * 100
      ]) */
      let y = val[i] / limit * 100
      let x = (myCanvas.width - 42) / (val.length - 1) * i

      ctx.lineTo(20 + x, (myCanvas.height - 20) - ((myCanvas.height - 40) * y / 100))
      /* console.log([y, x]) */

    }
    ctx.lineTo(myCanvas.width - 20, myCanvas.height - 20)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fillStyle = '#00aeff'
    ctx.fill()
  }

  let wallet = 0,
    loopy = false

  function slowBet() {

    let bal = 100,
      bet = 0,
      wins = 0,
      losses = 0,
      wlr = 0,
      betcount = 0,
      bals = [],
      highest = 100,
      loseStreak = 0

    let slowbetloop = setInterval(() => {
      answer = Math.floor(Math.random() * 2) + 1
      betcount++

      bals.push(bal)

      if (answer == 1) {
        loseStreak = 0
        wins++
        bal += bet * 2

/*         if (bal > 200) {
          wallet += bal - 100
          bal = 100
          loopy = false
          clearInterval(slowbetloop)
        } */

        bet = bal * 0.02
        /* bal -= bet */
        wlr = wins / losses
        console.log(`${betcount}, ${answer}, ${bet}, ${bal}, ${wins}, ${losses}, ${wlr}, ${highest}`)
      } else {
        losses++
        /* if (loseStreak > 0) bet *= loseStreak / 100
        else  */bet *= 3
        bal -= bet
        loseStreak++
        console.log(`${betcount}, ${answer}, ${bet}, ${bal}, ${wins}, ${losses}, ${wlr}, ${highest}, ${wallet}`)
      }

      if (bal > highest) highest = bal

      if (bal <= 0) {
        bals.push(bal)
        clearInterval(slowbetloop)
      }

      /* console.log(`${betcount}, ${answer}, ${bet}, ${bal}, ${wins}, ${losses}, ${wlr}, ${highest}`) */
      plotPoints(bals, highest)
      displayAxis()

    }, 100);
    console.log(`${betcount}, ${answer}, ${bet}, ${bal}, ${wins}, ${losses}, ${wlr}, ${highest}`)
    plotPoints(bals, highest)
    displayAxis()
  }

/*   setInterval(() => {
    while (!loopy) {
      slowBet()
      loopy = true
    }
  }, 100); */



  slowBet()

  




/*   function singraf() {
    let a = []
    for (let i = 0; i < 2 * Math.PI; i += 0.001) a.push((Math.tan(10*i)+1)/2)
    return a
  }

  console.log(singraf())

  plotPoints(singraf(), 1) */

})