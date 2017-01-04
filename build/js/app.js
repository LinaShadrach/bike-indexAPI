(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "c082a04172c97a5fe878a1494d05aac90243c0b90976adeb1899ab3e7f26c429";

},{}],2:[function(require,module,exports){
function Bike () {
  // this.manufacturer= null;
}

Bike.prototype.countManufacturer = function (foundBikes) {
  var bikeCount = foundBikes.length;
  console.log(foundBikes);
  return bikeCount;
};

exports.bikeModule = Bike;

},{}],3:[function(require,module,exports){
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

},{"./../.env":1,"./../js/bike.js":2}]},{},[3]);
