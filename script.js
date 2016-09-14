// Initialize game variables
var game = {
  count: 0,
  colors: ["#green", "#red", "#yellow", "#blue"],
  compSeq: [],
  playerSeq: [],
  sound: {
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
  strict: false,
}


// Attach sounds and visual animation to each pad press
  function sound(color) {
    switch (color) {
      case "#green":
        game.sound.green.play();
        break;
      case "#red":
        game.sound.red.play();
        break;
      case "#yellow":
        game.sound.yellow.play();
        break;
      case "#blue":
        game.sound.blue.play();
        break;
    }
  }

  function animation(color) {
    $(color).addClass("animate");
    sound(color);
    setTimeout(function() {
      $(color).removeClass("animate");
    }, 500)
  }

  // Strict Mode
  function checkStrict() {
    if ($("#strict").is(":checked")){
      game.strict = true;
    } else {
      game.strict = false;
    }
  }

  // When player presses "Start," start the game
  $("#start").click(function() {
    checkStrict();
    resetGame();
    $("#count-num").html("--");
    generateNext();
  });

  // Reset the game
  function resetGame() {
    game.compSeq = [];
    game.playerSeq = [];
    game.count = 0;
  }

  // Generate the next color
  function generateNext() {
    game.count++;
    if (game.count < 10) {
      $("#count-num").html("0" + game.count);
    } else {
      $("#count-num").html(game.count);
    }
    game.compSeq.push(game.colors[(Math.floor(Math.random() * 4))]);
    playSeq();
  }

  // Play the entire sequence of colors
  function playSeq() {
    var i = 0;
    var seq = setInterval(function() {
      animation(game.compSeq[i]);
      i++;
      if (i >= game.compSeq.length) {
        clearInterval(seq);
      }
    }, 700)
    game.playerSeq = [];
  }

  // Add whichever color the player clicked on onto the player's sequence
  function addColorToPlayer(id) {
    var color = "#" + id;
    console.log(color);
    game.playerSeq.push(color);
    checkPlayerMove(color);
  }

  // Check if the player move matched the last color
  // If no, either re-play the sequence (normal mode) or end the game (strict mode)
  // If yes, move on
  // When count equals 20, the player wins!
  function checkPlayerMove(color) {
    if (game.playerSeq[game.playerSeq.length - 1] !== game.compSeq[game.playerSeq.length - 1]) {
      sound(color);
      if (game.strict === true) {
        $("#msg").text("You lost!");
        $("#board").fadeOut("slow");
        $("#final-screen").fadeTo("slow",1);
      } else {
        //insert some kind of warning message thing here saying wrong
        setTimeout(function() {
            alert("Wrong move! Try again.");
          }, 500);
        setTimeout(function() {
            playSeq();
          }, 500);
      }
    } else {
      sound(color);
      var checkCorrect = game.playerSeq.length === game.compSeq.length;
      if (checkCorrect) {
        if (game.count === 20) {
          $("#msg").text("You won!");
          $("#board").fadeOut("slow");
          $("#final-screen").fadeTo("slow",1);
        } else {
          setTimeout(function() {
            generateNext();
          }, 850)
        }
      }
    }
  }

  $("#new-game").click(function() {
    $("#final-screen").fadeOut("slow");
    $("#board").fadeTo("slow",1);
    $("#strict").prop("checked", false);
    resetGame();
    $("#count-num").html("--");
  });
