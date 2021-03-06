var request = require("request");
var cheerio = require("cheerio");
var readline = require('readline');
var fs = require('fs');

var nb_page = 0;


function getRestaurant() {

  request({
    uri: "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin",
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    $(".mr-pager-link").each(function() {
      var link = $(this);


      if (nb_page < parseInt(link.attr("attr-page-number"))) {
        nb_page = parseInt(link.attr("attr-page-number"));
      }
    });
    console.log("Nb page : " + nb_page);

    for (var i = 1; i <= nb_page; i++) {
      request({
        uri: "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-" + i,
      }, function(error, response, body) {
        var $ = cheerio.load(body);
        $(".poi-card-link").each(function() {
          var link = $(this);
          var title = $(this).find(".poi_card-display-title").text().trim();
          var url = link.attr("href");

          fs.appendFileSync("./LinkRestaurants2018.txt", "https://restaurant.michelin.fr" + url + "\r\n", null, 'utf8', (err) => {
            if (err) console.log(err)

          });
        });
      });
    }

  });
}

function getNumberOfStars(iconName) {
  switch (iconName) {
    case "icon-cotation1etoile":
      return 1;
      break;
    case "icon-cotation2etoiles":
      return 2;
      break;
    case "icon-cotation3etoiles":
      return 3;
      break;
  }
}

function getDescription() {
  var contents = fs.readFileSync("./LinkRestaurants2018.txt", "utf8");
  var line = contents.split("\n");
  for (var i = 560; i <614; i++) {
    request({
      uri: line[i],
    }, function(error, response, body) {
      if (!error) {
        var $ = cheerio.load(body);
        var restaurant = new Object();
        restaurant.name = $(".poi_intro-display-title").text().trim();
        var stars = ($(".guide-icon")[0]).attribs.class.split(" ")[2];
        restaurant.stars = getNumberOfStars(stars);
        restaurant.street = $(".poi_intro-display-address").find(".thoroughfare").text().trim();
        restaurant.postalCode = $(".poi_intro-display-address").find(".postal-code").text().trim();
        restaurant.city = $(".poi_intro-display-address").find(".locality").text().trim();
        restaurant.picture = $(".landscape").attr("data-src");
        const document = JSON.stringify(restaurant);

        fs.appendFileSync("./RestaurantsInfoTest.json", document + "\r\n", null, 'utf8', (err) => {});

      } else {
        console.log(error);
        fs.appendFileSync("./errorLog.txt", line + "\r\n", null, 'utf8', (err) => {});
      }
    });
  }
}
getDescription();

//getRestaurant();
