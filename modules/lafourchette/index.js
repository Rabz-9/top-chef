var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");

var data = fs.readFileSync("../michelin/RestaurantsInfo.json", "utf8");
var restaurant = data.split("\n");
var contents = [];
for(var i = 0 ; i <restaurant.length -1 ; i++)
{
  contents[i] = JSON.parse(restaurant[i]);
}

function getIDFork()
{
  var results = [];
  request({
    uri:"https://m.lafourchette.com/api/restaurant-prediction?name=Auberge_du_Cheval",
  }, function(error , response , body){
    var $ = cheerio.load(body);
    results = JSON.parse($.text().trim());
    
  });
  console.log(results);
}

getIDFork();
