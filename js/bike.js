function Bike () {
  // this.manufacturer= null;
}

Bike.prototype.countManufacturer = function (foundBikes) {
  var bikeCount = foundBikes.length;
  return bikeCount;
};

Bike.prototype.zipConverter = function (addresses) {
  var zips = [];
  var regex = /\d/g;
  for (var i=0; i<addresses.length; i++) {
    if (addresses[i].match(regex) !== null) {
      var zip = addresses[i].match(regex);
      if (zip.length>=5) {
        var zipSlice= zip.slice((-6),(zip.length)).join('');
        zips.push(zipSlice);
      }
    }
  }
    return zips;
};

Bike.prototype.getAddresses = function(bikes) {
  var addresses = [];
  for (var i=0; i<bikes.length; i++) {
    var loc = bikes[i].stolen_location;
    addresses.push(loc);
  }
  return addresses;
};
exports.bikeModule = Bike;
