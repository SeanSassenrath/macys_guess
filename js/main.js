$(document).ready(function() {
  console.log("main.js has been found");

  var productPrice;
  var gender;
  var offsetArray = [];

  $("#guess-field").hide();
  $("#guess-submit").hide();

  $("#womens-button").on("click", function() {
    gender = "womens+dresses";
    $("#mens-button").hide();
    $("#womens-button").hide();
    $("#guess-field").show();
    $("#guess-submit").show();
    getItem();
  })

  $("#mens-button").on("click", function() {
    gender = "mens+shirts";
    $("#mens-button").hide();
    $("#womens-button").hide();
    $("#guess-field").show();
    $("#guess-submit").show();
    getItem();
  })

  var compareGuess = function(guess, actualPrice) {
    var lowPriceRange = (actualPrice - (actualPrice * .20));
    var highPriceRange = (actualPrice + (actualPrice * .20));
    console.log("Low price range " + lowPriceRange);
    console.log("High price range " + highPriceRange);
    console.log("Users guess is " + guess);

    if((guess > lowPriceRange) && (guess < highPriceRange)) {
      $("#message-container").append("<h3 style='text-align: center;'>You Win!</h3><h5 style='text-align: center;'>Actual Price: $" + actualPrice + "<h5>")
    } else {
      $("#message-container").append("<h3 style='text-align: center;'>You Lose</h3><h5 style='text-align: center;'>Actual Price: $" + actualPrice + "<h5>")
    }
  };

  var changeButtonsToNext = function() {
    $("#guess-field").hide();
    $("#guess-submit").hide();
    $("#guess-field-container").append("<button id='buy-item'>Buy</button>");
    $("#guess-submit-container").append("<button id='next-item'>Next</button>");
  }

  $(this).on("click", "#next-item", function() {
    $("#buy-item").hide();
    $("#next-item").hide();
    $("#guess-field").show();
    $("#guess-submit").show();
    $("#product-photo-container").empty();
    $("#product-description").empty();
    $("#message-container").empty();
    getItem();

  });

  $("#guess-submit").on("click", function() {
    $("#message-container").empty();
    var userGuess = $("#guess-field").val();
    compareGuess(userGuess, productPrice);
    $("#buy-item").remove();
    $("#next-item").remove();
    changeButtonsToNext();
  })

  var getItem = (function() {
    var offset = Math.floor(Math.random() * 1000);
    console.log(offset);

    $.ajax({
    type: "GET",
    url: "http://api.shopstyle.com/api/v2/products?pid=uid209-31161703-45&fts=" + gender + "&fl=r2&offset=" + offset + "&limit=1&format=jsonp",
    dataType: "jsonp",
    cache: false,
    crossDomain: true,
    processData: true,
    }).done(function(response){
      console.log(response)
      console.log("Image ", response.products[0].price);
      var mediumImg = response.products[0].image.sizes.XLarge.url;
      var name = response.products[0].brandedName;
      productPrice = response.products[0].price;
      console.log("PRICE " + response.products[0].price);
      console.log("Product Price " + productPrice);
      $("#product-photo-container").append("<img style='display: block; margin: 50px auto; max-height: 250px;' src=" + mediumImg + ">");
      $("#product-description").append("<h4 class='text-center'>" + name + "</h4>")
      // $("product-photo-container").append("<img src=" + mediumImg + ">")
    }).fail(function(response) {
      console.log("Failed ", response);
    });
  });

});