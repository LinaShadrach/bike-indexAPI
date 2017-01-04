var apiKey = require('./../.env').apiKey;
var Bike = require('./../js/bike.js').bikeModule;

$(document).ready(function(){
  $(".findBikes").submit(function(event){
    event.preventDefault();
    var location = $('#location').val();
    var make = $("#manufacturer").val();
    $("#make").val("");
    console.log("make" + make);
    var bike = new Bike();
    var foundCount = 0;
    var responseFound = true;
    var pageCount = 0;
    do{
      pageCount++;
      $.get('https://bikeindex.org:443/api/v3/search?page=' + pageCount +'&per_page=100&manufacturer=' + make + '&location=' + location + '&stolenness=stolen&access_token=' + apiKey).then(function(response){
        if (response.bikes.length>0) {
          responseFound = true;
          foundCount += bike.countManufacturer(response.bikes);
          console.log(foundCount);
        } else {
          responseFound = false;
        }
        });
    } while (responseFound===true);

      $('#result').text(foundCount + " bikes were found matching that description.");


  });
});
