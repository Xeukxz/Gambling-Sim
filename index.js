$(() => {
  myCanvas.width = 700;
  myCanvas.height = 600;
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  let profitColors = 1,
    roundingExponent = 2,
    roundingWindowClosed = true,
    modesWindowClosed = true,
    mode = 'Default'

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

  function quickBet() {
    $('#log').html("")

    let bal = 100,
      bet = 0,
      wins = 0,
      losses = 0,
      wlr = 0,
      betcount = 0,
      bals = [],
      highest = 100,
      loseStreak = 0,
      lastbal = 100,
      wlc = 'white'

      while(bal > 0) {
      answer = Math.floor(Math.random() * 2) + 1
      betcount++
      lastbal = bal
      bals.push(bal)
      bal -= bet
      if (answer == 1) {
        wlc = 'lime'
        lastbal -= bet
        wins++
        bal += bet * 2
        bet = bal * 0.02
      } else {
        wlc = 'red'
        bet *= 3
      }

      bal = Math.round(bal * (10 ** roundingExponent))/10 ** roundingExponent

      bet = Math.round(bet * (10 ** roundingExponent))/10 ** roundingExponent

      profit = bal - lastbal

      profit = Math.round(profit * (10 ** roundingExponent))/10 ** roundingExponent

/*       if (bet != 0) $('#log').append(`
      <p id="logValue" style="color:${wlc}">
        <span class="betCountVal" style="width:60px;padding-right:10px;text-align:center;">${betcount}</span>
        <span class="logValueVal">
          Bal: ${bal}
        </span>
        <span class="logValueVal">
          Bet: ${bet}
        </span>
        <span id="profitValue" class="profitValue logValueVal">
          Profit: ${profit}
        </span>
      </p>
      `)
      else betcount-- */

      if (bal > highest) highest = bal

      if (bal <= 0) {
        bals.push(bal)
        $('#log').append(`
          <p id="logValue">
            <span id="highestVal" class="logValueVal">
              Highest Bal: ${highest}
            </span>
          </p>
      `)
        setProfitColors()
      }


      /* console.log(`${betcount}, ${answer}, ${bet}, ${bal}, ${wins}, ${losses}, ${wlr}, ${highest}`) */
      if (bet != 0) plotPoints(bals, highest)
      displayAxis()
      //var element = document.getElementById("yourDivID");
      $('#log')[0].scrollTop = $('#log')[0].scrollHeight;

    }
    if (bet != 0) plotPoints(bals, highest)
    displayAxis()
    let data = {
      highest: highest,
      betcount: betcount,
      bals: bals
    }
    return data
  }

  function slowBet() {

    $('#log').html("")

    let bal = 100,
      bet = 0,
      wins = 0,
      losses = 0,
      wlr = 0,
      betcount = 0,
      bals = [],
      highest = 100,
      loseStreak = 0,
      lastbal = 100,
      wlc = 'white'

    let slowbetloop = setInterval(() => {
      answer = Math.floor(Math.random() * 2) + 1
      betcount++
      lastbal = bal

      bals.push(bal)

      /*  if(bet != 0) bet = bal * 0.02 */

      bal -= bet
      plotPoints(bals, highest)

      if (answer == 1) {
        wlc = 'lime'
        lastbal -= bet
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
        /* bal = Math.round(bal)
        bet = Math.round(bet) */
        /* bal -= bet */
        wlr = wins / losses
        console.log(`${betcount}, ${answer}, ${bet}, ${bal}, ${wins}, ${losses}, ${wlr}, ${highest}`)
      } else {
        wlc = 'red'
        console.log(lastbal, bal, lastbal - bal)
        losses++
        /* if (loseStreak > 0) bet *= loseStreak / 100
        else  */
        bet *= 3
        loseStreak++
        console.log(`${betcount}, ${answer}, ${bet}, ${bal}, ${wins}, ${losses}, ${wlr}, ${highest}, ${wallet}`)
      }

      bal *= 10 ** roundingExponent
      bal = Math.round(bal)
      bal /= 10 ** roundingExponent

      bet *= 10 ** roundingExponent
      bet = Math.round(bet)
      bet /= 10 ** roundingExponent

      profit = bal - lastbal

      profit *= 10 ** roundingExponent
      profit = Math.round(profit)
      profit /= 10 ** roundingExponent

      console.log(lastbal, bal, lastbal - bal)

      if (bet != 0) $('#log').append(`
      <p id="logValue" style="color:${wlc}">
        <span class="betCountVal" style="width:60px;padding-right:10px;text-align:center;">${betcount}</span>
        <span class="logValueVal">
          Bal: ${bal}
        </span>
        <span class="logValueVal">
          Bet: ${bet}
        </span>
        <span id="profitValue" class="profitValue logValueVal">
          Profit: ${profit}
        </span>
      </p>
      `)
      else betcount--



      if (bal > highest) highest = bal

      if (bal <= 0) {
        bals.push(bal)
        clearInterval(slowbetloop)
        $('#log').append(`
          <p id="logValue">
            <span id="highestVal" class="logValueVal">
              Highest Bal: ${highest}
            </span>
          </p>
      `)
        setProfitColors()
      }

      /* console.log(`${betcount}, ${answer}, ${bet}, ${bal}, ${wins}, ${losses}, ${wlr}, ${highest}`) */
      if (bet != 0) plotPoints(bals, highest)
      displayAxis()
      //var element = document.getElementById("yourDivID");
      $('#log')[0].scrollTop = $('#log')[0].scrollHeight;

    }, 1);
    console.log(`${betcount}, ${answer}, ${bet}, ${bal}, ${wins}, ${losses}, ${wlr}, ${highest}`)
    if (bet != 0) plotPoints(bals, highest)
    displayAxis()
  }

  function sexyData() {

  }
  /*   setInterval(() => {
      while (!loopy) {
        slowBet()
        loopy = true
      }
    }, 100); */

  function setProfitColors() {
    if (profitColors == 0) {
      $('.logValueVal').css('color', 'white')
      $('.profitValue').css('color', 'white')
      $('#highestVal').css('color', 'white')
      $('.betCountVal').css('color', 'white')
    } else if (profitColors == 1) {
      $('.logValueVal').css('color', 'white')
      $('#highestVal').css('color', 'lime')
      $('.betCountVal').css('color', 'white')
      $('.profitValue').css('color', 'inherit')
    } else {
      $('.logValueVal').css('color', 'inherit')
      $('.profitValue').css('color', 'inherit')
      $('#highestVal').css('color', 'lime')
      $('.betCountVal').css('color', 'inherit')
    }
    console.log(profitColors)

  }

  $('#option-run').on('click', event => {
    console.log(mode)
    if(mode == 'Default') slowBet()
    else if(mode == 'QuickRun') {
      quickBet()
      $('#log').append(`
      <p style="text-align:center;">
        <span style="color:red">
          Logs removed for performance
        </span>
      </p>`)
    } else if(mode == 'MultipleIterations') {
      let iterations = []
      let highestIteration = 0
      let RunIterations = setInterval(() => {
        let iteration = quickBet().highest
        if (iteration > highestIteration) highestIteration = iteration
        iterations.push(iteration)
        plotPoints(iterations, highestIteration)
        displayAxis()
        if(iterations.length > 1000) {
        clearInterval(RunIterations)
        $('#log').html("")
        for(let i in iterations) {
          $('#log').append(`
          <p id="logValue">
            <span class="logValueVal" style="color:lime">
              Bal: ${iterations[i]}
            </span>
          </p>`)
        }
        $('#log').append(`
        <p style="text-align:center;">
          <span style="color:lime">
            Highest: ${highestIteration}
          </span>
        </p>`)
        $('#log')[0].scrollTop = $('#log')[0].scrollHeight;
        }
      }, 1);
    } else if(mode == 'Averages') {
      let betcounts = []
      let averages = []
      let average = 0
      let highestAverage = 0
      let highestBetCount = 0
      let runAverages = setInterval(() => {
        let betcount = quickBet().betcount
        betcounts.push(betcount)
        let average = 0
        for(let i in betcounts) {
          average += betcounts[i]
        }
        average /= betcounts.length
        if(betcount > highestBetCount) highestBetCount = betcount
        if(average > highestAverage) highestAverage = average
        averages.push(average)
        plotPoints(averages, highestAverage)
        displayAxis()
        if(averages.length > 1000) {
        clearInterval(runAverages)
        $('#log').html("")
        for(let i in averages) {
          $('#log').append(`
          <p id="logValue">
          <span class="logValueVal" style="color:lime">
            Average: ${averages[i]}
          </span>
          <span class="logValueVal" style="color:lime">
            betcount: ${betcounts[i]}
          </span>
          </p>`)
        }
        $('#log').append(`
        <p style="text-align:center;">
          <span style="color:lime">
            Highest Betcount: ${highestBetCount}
          </span>
        </p>`)
        $('#log')[0].scrollTop = $('#log')[0].scrollHeight;
        }

      }, 1);
    }

  })
  $('#option-color').on('click', event => {
    profitColors++
    if (profitColors > 2) profitColors = 0
    setProfitColors()
  })

  function sendMessage(msg) {
    $('#message').html(msg)
    setTimeout(() => {
      $('#message').html("")
    }, 5000);
  }

  function changeRounding(val) {
    $('#roundingPopup').css('display', 'none')
    roundingWindowClosed = true
    roundingExponent = val
    sendMessage(`Rounding has been changed to ${roundingExponent} decimal places, run the simulation again for its effect to take place`)
  }

  $('#round0').on('click', event => {
    changeRounding(0)
  })
  $('#round1').on('click', event => {
    changeRounding(1)
  })
  $('#round2').on('click', event => {
    changeRounding(2)
  })
  $('#round3').on('click', event => {
    changeRounding(3)
  })
  $('#round4').on('click', event => {
    changeRounding(4)
  })
  $('#round5').on('click', event => {
    changeRounding(5)
  })
  $('#closeRounding').on('click', event => {
    $('#roundingPopup').css('display', 'none')
    roundingWindowClosed = true
  })
  $('#option-round').on('click', event => {
    if (roundingWindowClosed) {
      $('#roundingPopup').css('display', 'block')
      roundingWindowClosed = false
      $('#modesPopup').css('display', 'none')
      modesWindowClosed = true
    } else {
      $('#roundingPopup').css('display', 'none')
      roundingWindowClosed = true
    }
  })

  $('#option-modes').on('click', event => {
    if(modesWindowClosed) {
      $('#modesPopup').css('display', 'block')
      modesWindowClosed = false
      $('#roundingPopup').css('display', 'none')
      roundingWindowClosed = true
    } else {
      $('#modesPopup').css('display', 'none')
      modesWindowClosed = true
    }
  })

  $('#mode-Default').on('click', event => {
    mode = 'Default'
    sendMessage('Mode set to "Default"')
    $('#modesPopup').css('display', 'none')
    modesWindowClosed = true
  })

  $('#mode-QuickRun').on('click', event => {
    mode = 'QuickRun'
    sendMessage('Mode set to "Quick Run"')
    $('#modesPopup').css('display', 'none')
    modesWindowClosed = true
    
  })

  $('#mode-MultipleIterations').on('click', event => {
    mode = 'MultipleIterations'
    sendMessage('Mode set to "Multiple Iterations"')
    $('#modesPopup').css('display', 'none')
    modesWindowClosed = true
    
  })

  $('#mode-Averages').on('click', event => {
    mode = 'Averages'
    sendMessage('Mode set to "Averages"')
    $('#modesPopup').css('display', 'none')
    modesWindowClosed = true
    
  })

  $('#option-modeSettings').on('click', event => {
    sendMessage('"Mode Settings" Coming Soon')
  })

  $('#option-info').on('click', event => {
    sendMessage('"Information" Coming Soon')
  })
  
/* 
  mode-Default
  mode-QuickRun
  mode-MultipleIterations
  mode-Averages
 */






  /*   function singraf() {
      let a = []
      for (let i = 0; i < 2 * Math.PI; i += 0.001) a.push((Math.tan(10*i)+1)/2)
      return a
    }

    console.log(singraf())

    plotPoints(singraf(), 1) */

})