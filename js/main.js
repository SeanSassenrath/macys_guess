$(document).ready(function() {
  $(document).foundation();
  console.log("main.js has been found");

  var productsArray = [];
  var currentProduct = 0;
  var gender;

  $(".button-select").on("click", function() {
    gender = $(this).attr("id");
    $('.action-buttons').hide();
    productsArray = [];
    $('.product').empty();
    getItem();
    introTransition();
    displayProduct();
  })

  $("#guess-submit").on("click", function() {
    console.log('submitting guess')
    submitGuess();
    $("#results-container").show();
    $("#guess-field").val("");
  })

  $("#next").on("click", function() {
    $('.action-buttons').hide();
    $('#results-container').hide();
    $('.guess-container').show();
    $('.product').empty();
    currentProduct += 1;
    displayProduct();
  });

  $("#about-us-button").on("click", function() {
    $(".m-section").toggle()
    if($(this).text() === "About The App") {
      $(this).html("Start Game");
    } else {
      $(this).html("About The App")
    }
    // if(aboutUsShowing === false) {
    //   $("#game-container").hide()
    //   $("#about-us-area").show();
    //   aboutUsShowing = true;
    // } else {
    //   $("#about-us-area").hide();
    //   $("#game-container").show()
    //   aboutUsShowing = false;
    // }
  })

  var introTransition = function() {
    $(".welcome-txt").hide();
    $("#content-container").show();
    $(".guess-container").show();
  }
  var getItem = (function() {
    var offset = Math.floor(Math.random() * 1000);
    console.log(offset);
    $.ajax({
    type: "GET",
    url: "http://api.shopstyle.com/api/v2/products?pid=uid209-31161703-45&fts=" + gender + "&fl=r2&offset=" + offset + "&limit=20&format=jsonp",
    dataType: "jsonp",
    cache: false,
    crossDomain: true,
    processData: true,
    }).done(function(response){
      for(var i = 0; i < response.products.length; i++) {
        productsArray.push(response.products[i]);
      }
      console.log("Success ", response)
      displayProduct();
    }).fail(function(response) {
      console.log("Failed ", response);
    });
  });

  var displayProduct = (function() {
    var xLargeImg = productsArray[currentProduct].image.sizes.XLarge.url;
    var name = productsArray[currentProduct].brandedName;
    productUrl = productsArray[currentProduct].pageUrl;
    $("#product-photo-container img").attr('src', xLargeImg);
    $("#product-description").html(name)
    $("#buy-button").attr('href', productsArray[currentProduct].pageUrl);
  })

  var submitGuess = function() {
    var userGuess = $("#guess-field").val();
    $('.guess-container').hide();
    $('.action-buttons').show();
    compareGuess(userGuess, productsArray[currentProduct].price);
  }
  var compareGuess = function(guess, actualPrice) {
    var lowPriceRange = (actualPrice - (actualPrice * .20));
    var highPriceRange = (actualPrice + (actualPrice * .20));
    if((guess > lowPriceRange) && (guess < highPriceRange)) {
      $(".win").html("You Win!")
    } else {
      $(".lose").html("You Lose!")
    }
    $(".actual-price").html("$ " + actualPrice)
  };

});