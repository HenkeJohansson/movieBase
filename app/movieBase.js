

var movieBase = angular.module('movieBase', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

movieBase.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'pages/home.html',
			controller 	: 'homeCtrl',
			controllerAs : 'vm'
		})
		.when('/addMovie', {
			templateUrl : 'pages/addMovie.html',
			controller 	: 'omdbiCtrl',
			controllerAs : 'vm'
		});

		$locationProvider.html5Mode(true);
});


movieBase.controller('homeCtrl', function($http, $modal) {
	var home = this;

	$http.get('api/getMovies.php?watched='+0).success(function(response) {
		home.unseen = response;
		console.log(response);
	});

	$http.get('api/getMovies.php?watched='+1).success(function(response) {
		home.seen = response;
	});

	home.openModal = function(imdb_id) {

		var modalInstance = $modal.open({
			animation: false,
			templateUrl: 'pages/partials/movieModal.html',
			controller: 'ModalInstanceCtrl',
			controllerAs: 'vm',
			size: 'lg',
			resolve: {
				imdb_id: function() {
					return imdb_id;
				}
			}
		});

		modalInstance.result.then(function() {
			home.modalResult = "Klickade OK";
		}, function() {
			home.modalResult = "Klickade Cancel";
		});
	};


});

movieBase.controller('ModalInstanceCtrl', function($modalInstance, $http, imdb_id) {
	var modal = this;

	modal.text = 'Controllern funkar?';


	modal.extendedInfo = function(imdb_id) {
		console.log(imdb_id);
	
		$http.get('api/getMovieInfo.php?imdb_id='+imdb_id).success(function(response) {
			modal.movieNfo = response;
			console.log(modal.movieNfo);
		});

	};

	modal.extendedInfo(imdb_id);

	modal.ok = function() {
		$modalInstance.close();
	};

	modal.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});


movieBase.controller('omdbiCtrl', function($http) {
	var omdbi = this;

	/***********************************************
	** Search
	***********************************************/
	var pendingTask;
	omdbi.details = [];
	omdbi.related = [];
	omdbi.fullMovieInfo = {};

	if (omdbi.search === undefined) {
		omdbi.search = 'Star Wars: Episode IV - A New Hope';
		fetch();
	}


	omdbi.change = function() {
		if (pendingTask) {
			clearTimeout(pendingTask);
		}
		pendingTask = setTimeout(fetch, 800);
	};

	function fetch() {
		$http.get("http://www.omdbapi.com/?s=" + omdbi.search + "&plot=short&r=json").
			success(function(response) {
				omdbi.details = response.Search;
				// omdbi.details.length = 0;
				// Array.prototype.push.apply(omdbi.details, response.Search);

				console.log(omdbi.details);
			});

		$http.get("http://www.omdbapi.com/?s=" + omdbi.search).
			success(function(response) {
				omdbi.related = response.Search;
				console.log(omdbi.related);
			});
	}

	/***********************************************
	** Save
	***********************************************/
	omdbi.save = function(imdbID) {
		$http.get("http://www.omdbapi.com/?i=" + imdbID + "&plot=short&r=json").
			success(function(response) {
				omdbi.fullMovieInfo = response;
				console.log(omdbi.fullMovieInfo);
				// omdbi.insertMovie();
				
				var movieAdd = {
					name: omdbi.fullMovieInfo.Title,
					name_original: omdbi.fullMovieInfo.Name_original,
					plot: omdbi.fullMovieInfo.Plot,
					year: omdbi.fullMovieInfo.Year,
					imdb_id: omdbi.fullMovieInfo.imdbID,
					imdb_poster: omdbi.fullMovieInfo.Poster,
					imdb_rating: omdbi.fullMovieInfo.imdbRating,
					imdb_votes: omdbi.fullMovieInfo.imdbVotes,
					genre: omdbi.fullMovieInfo.Genre,
					length: omdbi.fullMovieInfo.Runtime,
					director: omdbi.fullMovieInfo.Director,
					writer: omdbi.fullMovieInfo.Writer,
					actors: omdbi.fullMovieInfo.Actors
				};

				$http.post("api/addMovie.php", movieAdd).
					success(function() {
						console.log('Film tillagd');
						console.log(omdbi.fullMovieInfo.name);
					});
			});
	};


});
