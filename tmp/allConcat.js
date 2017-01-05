var apiKey = require('./../.env').apiKey;
var googleKey = require('./../.env').googleKey;
var Bike = require('./../js/bike.js').bikeModule;

$(document).ready(function(){
  $(".findBikes").submit(function(event){
    event.preventDefault();
    var location = $('#location').val();
    var make = $("#manufacturer").val();
    $("#make").val("");
    $.get('https://bikeindex.org:443/api/v3/search/count?manufacturer=' + make + '&location=' + location + ' &stolenness=stolen&access_token=' + apiKey).then(function(response){
      console.log(response);
      $('#result').text(response.proximity + " bikes were found matching that description.");
    });
  });
});
