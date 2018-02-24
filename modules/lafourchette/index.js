var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var results = [];
var data = fs.readFileSync("../michelin/RestaurantsInfo.json", "utf8");
var restaurant = data.split("\n");
var contents = [];
var idFork = 0;
var hadDiscount = false;

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
        //console.log(search + idFork);
        restaurant.id = idFork;
        restaurant.name = search;
        restaurant.promotions = [];
        let promo = [];
          request({
            uri: "https://m.lafourchette.com/api/restaurant/" + idFork + "/sale-type",
          }, function(error, response, body) {
            const $ = cheerio.load(body);
            resultsSales = JSON.parse($.text().trim());
            let j = 0;
            if (idFork != undefined) {
              for (var i = 0; i < resultsSales.length; i++) {
                if (resultsSales[i]["exclusions"] != "" && resultsSales[i].hasOwnProperty("exclusions")) {
                    promo[j] = resultsSales[i]["title"];
                    console.log("Promo dans le tableau : " + promo[j]);
                    j = j+1

                }
                // if(resultsSales[i]["exclusions"] != "" && resultsSales[i].hasOwnProperty("exclusions"))
                // {
                //     hadDiscount = true;
                //     restaurant.promotions={};
                //     restaurant.promotions[j]["title"] = resultsSales[i]["title"];
                //     restaurant.promotions[j]["exclusions"] = resultsSales[i]["exclusions"];
                //     j = j+1;
                // }
              }
            }
          });
          // const document = JSON.stringify(restaurant);
          // fs.appendFileSync("./RestaurantFork.json", document + "\r\n", null, 'utf8', (err) => {
          //   if (err) console.log(err)
          // });

          // ///  idFork = callback(contents[i].postalCode);
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

  getIDFork();


  function getDeals() {
    var url = "https://m.lafourchette.com/api/restaurant/4546/sale-type";
    request({
      uri: url,
    }, function(error, response, body) {
      const $ = cheerio.load(body);
      let test = JSON.parse()
    })
  }
