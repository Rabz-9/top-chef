var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var results = [];
var data = fs.readFileSync("../michelin/RestaurantsInfo.json", "utf8");
var restaurant = data.split("\n");
var contents = [];

for(var i = 0 ; i <restaurant.length -1 ; i++)
{
  contents[i] = JSON.parse(restaurant[i]);
}

function getIDFork(callback)
{
  request({
    uri:"https://m.lafourchette.com/api/restaurant-prediction?name=Auberge_du_Cheval",
  }, function(error , response , body){
    var $ = cheerio.load(body);
    results = JSON.parse($.text().trim());
    callback();
  });
}

function getIdResults()
{
  for(var i = 0 ; i < results.length ; i++)
  {
    console.log(results[i].address.address_locality);
  }
}
getIDFork(getIdResults);
