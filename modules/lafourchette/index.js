var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var results = [];
var data = fs.readFileSync("../michelin/RestaurantsInfo.json", "utf8");
var restaurant = data.split("\n");
var contents = [];
var idFork = 0;
var hadDiscount = false;
var promo = [];

for (var i = 0; i < restaurant.length - 1; i++) {
  contents[i] = JSON.parse(restaurant[i]);
}

function getIDFork() {
  for (var i = 0; i < contents.length; i++) {
    let search = contents[i].name;
    var url = "https://m.lafourchette.com/api/restaurant-prediction?name=" + encodeURIComponent(search)
    let postalCode = contents[i].postalCode
    request({
      uri: url,
    }, function(error, response, body) {
      const $ = cheerio.load(body);
      results = JSON.parse($.text().trim());
      idFork = getIdResults(postalCode);
      restaurant = new Object();
      restaurant.idFork = idFork;
      restaurant.name = search;
      let tab = [];
      let hasPromo = false; // ///  idFork = callback(contents[i].postalCode);
      if (idFork != undefined) {
        tab = getDeals(idFork, search, restaurant);
        writeDiscount(restaurant, tab);
      }
    });
  }
}

function getIdResults(postal_code) {
  for (var i = 0; i < results.length; i++) {
    if (results[i].address.postal_code == postal_code) {
      return results[i].id;
    }
  }
}

function getDeals(idFork, name, restaurant) {
  let promo = [];
  request({
    uri: "https://m.lafourchette.com/api/restaurant/" + idFork + "/sale-type",
  }, function(error, response, body) {
    const $ = cheerio.load(body);
    resultsSales = JSON.parse($.text().trim());
    if (idFork != undefined) {
      promo = addDeals(resultsSales, promo);
      if (promo.length != 0) {
        console.log("{IdFork : " + idFork + "\nName Starred Restaurant : "  + name + " \nPromo :"  + promo + "}\n");
      }
    }
    return promo;
  });
}

function addDeals(resultsSales, promo) {
  for (var i = 0; i < resultsSales.length; i++) {
    if (resultsSales[i]["exclusions"] != "" && resultsSales[i].hasOwnProperty("exclusions")) {
      promo.push(resultsSales[i]["title"]);
    }
  }
  return promo;
}

function writeDiscount(restaurant, promo) {
  restaurant.promotions = [];
  restaurant.promotions = promo;
  const document = JSON.stringify(restaurant);
  fs.appendFileSync("./RestaurantFork.json", document + "\r\n", null, 'utf8', (err) => {
    if (err) console.log(err)
  });
}

getIDFork();
