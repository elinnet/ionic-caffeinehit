// var app = angular.module('caffeinehit.services', []);
//
// app.service("YelpService", function ($q, $http, $cordovaGeolocation, $ionicPopup) {
// 	var self = {
// 		'page': 1,
// 		'isLoading': false,
// 		'hasMore': true,
// 		'results': [],
// 		'lat': 51.544440,
// 		'lon': -0.022974,
// 		'refresh': function () {
// 			self.page = 1;
// 			self.isLoading = false;
// 			self.hasMore = true;
// 			self.results = [];
// 			return self.load();
// 		},
// 		'next': function () {
// 			self.page += 1;
// 			return self.load();
// 		},
// 		'load': function () {
// 			self.isLoading = true;
// 			var deferred = $q.defer();
//
//
// 		ionic.Platform.ready(function(){
// 		    $cordovaGeolocation
// 		    .getCurrentPosition({timeout:10000, enableHighAccuracy:false})
// 		    .then(function(position){
// 		      self.lat = position.coords.latitude;
// 		      self.lon = position.coords.longitude;
//
// 					var params = {
// 						page: self.page,
// 						lat: self.lat,
// 						lon: self.lon
// 					};
//
// 					$http.get('https://codecraftpro.com/api/samples/v1/coffee/', {params: params})
// 						.success(function (data) {
//
// 							console.log(data);
// 							// console.log(data.businesses[1]);
// 							// console.log(data.businesses.length);
//
// 							if (data.businesses.length === 0) {
// 								self.hasMore = false;
// 							} else {
// 								angular.forEach(data.businesses, function (business) {
// 									self.results.push(business);
// 								});
// 							}
// 							self.isLoading = false;
// 							deferred.resolve();
// 						})
// 						.error(function (data, status, headers, config) {
// 							console.log("error");
// 							self.isLoading = false;
// 							deferred.reject(data);
// 						});
//
// 				}, function(err){
// 				    console.error("Error getting position");
// 				    console.error(err);
// 						$ionicPopup.alert({
// 							'title': "Please switch on geolocation",
// 							'template': "It seems like youve switched off geoloation for CaffeineHit"
// 						});
// 				}); //this is to close the then function
//
//
// 			});//this is to close the 'ionic.Platform.ready' function.plugin only call when ionic app finished loading
// 				return deferred.promise;
// 			}
// 	}; //this is to close var = self
//
// 	self.load();
//
// 	return self;
// }); //this is to close the service "Yelpservice"


var app = angular.module('caffeinehit.services', []);

app.service("YelpService", function ($q, $http, $cordovaGeolocation, $ionicPopup) {
	var self = {
		'page': 1,
		'isLoading': false,
		'hasMore': true,
		'results': [],
		'lat': 51.544440,
		'lon': -0.022974,
		'refresh': function () {
			self.page = 1;
			self.isLoading = false;
			self.hasMore = true;
			self.results = [];
			return self.load();
		},
		'next': function () {
			self.page += 1;
			return self.load();
		},
		'load': function () {
			self.isLoading = true;
			var deferred = $q.defer();

			ionic.Platform.ready(function () {
				$cordovaGeolocation
					.getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
					.then(function (position) {
						self.lat = position.coords.latitude;
						self.lon = position.coords.longitude;

						var params = {
							page: self.page,
							lat: self.lat,
							lon: self.lon
						};

						$http.get('https://codecraftpro.com/api/samples/v1/coffee/', {params: params})
							.success(function (data) {
								console.log(data);

								if (data.businesses.length === 0) {
									self.hasMore = false;
								} else {
									angular.forEach(data.businesses, function (business) {
										self.results.push(business);
									});
								}

								self.isLoading = false;
								deferred.resolve();
							})
							.error(function (data, status, headers, config) {
								self.isLoading = false;
								deferred.reject(data);
							});

					}, function (err) {
						console.error("Error getting position");
						console.error(err);
						$ionicPopup.alert({
							'title': 'Please switch on geolocation',
							'template': "It seems like you've switched off geolocation for caffeinehit, please switch it on by going to you application settings."
						});
					});
			});

			return deferred.promise;
		}
	};
		self.load();
	// Load the data and then paginate twice
	// self.load().then(function () {
	// 	self.next().then(function () {
	// 		self.next();
	// 	})
	// });

	return self;
});
