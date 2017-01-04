function Bike () {
  // this.manufacturer= null;
}

Bike.prototype.countManufacturer = function (foundBikes) {
  var bikeCount = foundBikes.length;
  console.log(foundBikes);
  return bikeCount;
};

exports.bikeModule = Bike;
