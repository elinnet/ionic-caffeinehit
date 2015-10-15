ionic.Platform.ready(function(){
    $cordovaGeoloation
    .getCurrentPosition({timeout:10000, enableHighAccuracy:false})
    .then(function(position){
      self.lat = position.coords.latitude;
      self.lon = position.coords.longitude;
    },function(err){
      console.error("Error getting position");
      console.error(err);
    });
});
