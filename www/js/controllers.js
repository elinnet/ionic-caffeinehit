var app = angular.module('caffeinehit.controllers', []);

app.controller("YelpController", function ($scope, YelpService) {
	$scope.yelp = YelpService;

	$scope.doRefresh = function(){
		console.log("loadMore");
		if (!$scope.yelp.isLoading) {
			$scope.yelp.refresh().then(function(){
				$scope.$broadcast('scroll.refreshComplete');
			});
		}
	};

	$scope.loadMore = function(){
		console.log("loadmore");
		if (!$scope.yelp.isLoading && $scope.yelp.hasMore){
			$scope.yelp.next().then(function(){
				$scope.$broadcast('scroll.refreshComplete');
			});
		}
	};

	$scope.getDirections = function(){
		console.log("Getting directions for cafe");
	};

	$scope.openMap = function(cafe){
		console.log("Opening cafe in maps app");
	};
});
