var bikeKey = require('./../.env').bikeKey;
var googleKey = require('./../.env').googleKey;
var Bike = require('./../js/bike.js').bikeModule;
var initMap = require('./../js/map.js').mapModule;
var geoKey = require('./../.env').geoKey;

var initMap=function() {
  var uluru = {lat: 39, lng: -100};
  var map = new google.maps.Map(document.getElementById('bikeMap'), {
    zoom: 4,
    center: uluru
  });
  return map;
};

var makeMark=function(foundLat, foundLng, map){
  console.log(foundLat + ", " + foundLng);
  var uluru = {lat: foundLat, lng: foundLng};
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
};


$(document).ready(function(){
  $(".findBikes").submit(function(event){
    event.preventDefault();
    var location = $('#location').val();
    var make = $("#manufacturer").val();
    $("#make").val("");
    $.get('https://bikeindex.org:443/api/v3/search?page=1&per_page=100&manufacturer=' + make + '&location=' + location + ' &stolenness=stolen&access_token=' + bikeKey).then(function(response){
      // console.log(response);
      $('#result').text(response.bikes[0]);
      console.log(response.bikes[0]);
      var bike = new Bike();
      var bikeAddresses = bike.getAddresses(response.bikes);
      var zips = bike.zipConverter(bikeAddresses);
      var map = initMap();
      for(var i=0; i<zips.length; i++){
        mapFunction(zips[i], map);
      }
    });
  });
  var mapFunction = function(postalCode, map) {
    $.get('https:maps.googleapis.com/maps/api/geocode/json?components=postal_code:'+ postalCode + '&key='+ geoKey).then(function(response){
      makeMark(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng, map);
    });
  };
});
