$(document).ready(function() {
  console.log("main.js has been found");

  var productsArray = [];
  var currentProduct = 0;
  var gender;

  $(".button-select").on("click", function() {
    gender = $(this).attr("id");
    introTransition();

    getItem();
    displayProduct();
  })

  $("#guess-submit").on("click", function() {
    submitGuess();
  })

  $("#next").on("click", function() {
    $('.next-container').hide();
    $('.guess-container').show();
    $('.product').empty();
    currentProduct += 1;
    displayProduct();
  });


  var introTransition = function() {
    $("#content-container").show();
    $("#results-container").show();
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
        console.log(productsArray);
      }
      console.log(response)
      displayProduct();
      // $("product-photo-container").append("<img src=" + mediumImg + ">")
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
  })

  var submitGuess = function() {
    var userGuess = $("#guess-field").val();
    $('.guess-container').hide();
    $('.next-container').show();
    compareGuess(userGuess, productsArray[currentProduct].price);
  }
  var compareGuess = function(guess, actualPrice) {
    var lowPriceRange = (actualPrice - (actualPrice * .20));
    var highPriceRange = (actualPrice + (actualPrice * .20));
    if((guess > lowPriceRange) && (guess < highPriceRange)) {
      $("#message-container").append("<h3 style='text-align: center;'>You Win!</h3><h5 style='text-align: center;'>Actual Price: $" + actualPrice + "<h5>")
    } else {
      $("#message-container").append("<h3 style='text-align: center;'>You Lose</h3><h5 style='text-align: center;'>Actual Price: $" + actualPrice + "<h5>")
    }
  };

});