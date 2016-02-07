

var movieBase = angular.module('movieBase', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

movieBase.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'pages/home.html',
			controller 	: 'homeCtrl',
			controllerAs : 'vm'
		})
		.when('/watchlist', {
			templateUrl : 'pages/watchlist.html',
			controller 	: 'watchlistCtrl',
			controllerAs : 'vm'
		})
		.when('/addMovie', {
			templateUrl : 'pages/addMovie.html',
			controller 	: 'movieApiCtrl',
			controllerAs : 'vm'
		});

		$locationProvider.html5Mode(true);
});


movieBase.controller('homeCtrl', function($http) {
	var home = this;

	home.getPosters = function() {

		$http.get('api/getPosters.php').success(function(response) {
			home.posters = response;
			console.log(response);
		});

	};

	home.random = function() {
        return 0.5 - Math.random();
    };

	home.getPosters();

});

movieBase.controller('watchlistCtrl', function($http, $modal) {
	var watchlist = this;

	watchlist.updateLists = function() {

		$http.get('api/getMovies.php?watched='+0).success(function(response) {
			watchlist.unseen = response;
			console.log(response);
		});

		$http.get('api/getMovies.php?watched='+1).success(function(response) {
			watchlist.seen = response;
			console.log(response);
		});

	};

	watchlist.updateLists();

	watchlist.openModal = function(imdb_id) {

		var modalInstance = $modal.open({
			animation: false,
			templateUrl: 'movieModal.html',
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
			watchlist.modalResult = "Klickade OK";
			watchlist.updateLists();
		}, function() {
			watchlist.modalResult = "Klickade Cancel";
		});
	};


});

movieBase.controller('ModalInstanceCtrl', function($modalInstance, $http, imdb_id) {
	var modal = this;

	modal.extendedInfo = function(imdb_id) {
		console.log(imdb_id);
	
		$http.get('api/getMovieInfo.php?imdb_id='+imdb_id).success(function(response) {
			modal.movieNfo = response;
			console.log(modal.movieNfo);
		});

	};

	modal.extendedInfo(imdb_id);

	console.log(modal.rating);
	modal.change = function($event) {
		$timeout(function() {
			console.log(modal.rating);
		});
	};

	modal.my_rating = function(value) {
		console.log("rating has changed");
		console.log(modal.my_rating_val);
		$http.post('api/rateMovie.php', {
			my_rating: modal.my_rating_val,
			imdb_id: imdb_id
		}).success(function(response) {
			console.log('Filmens betyg:' + modal.my_rating_val);
		});
	};

	// modal.my_rating = {};

	modal.ok = function(imdb_id) {
		$http.post('api/updateMovie.php', {
					imdb_id: imdb_id,
					my_rating: modal.my_rating_val
		}).success(function(response) {
			console.log('Uppdaterat');
			console.log(imdb_id);
		});
		$modalInstance.close();
	};

	modal.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});


movieBase.controller('movieApiCtrl', function($http) {
	var movieApi = this;

	/***********************************************
	** Search
	***********************************************/
	var pendingTask;
	movieApi.details = [];
	movieApi.related = [];
	movieApi.movieDb = {};
	movieApi.fullMovieInfo = {};

	// if (movieApi.search === undefined) {
	// 	movieApi.search = 'Star Wars: Episode IV - A New Hope';
	// 	fetch();
	// }


	movieApi.change = function() {
		if (pendingTask) {
			clearTimeout(pendingTask);
		}
		pendingTask = setTimeout(fetch, 800);
	};

	/***********************************************
	** Fetch
	***********************************************/
	function fetch() {

		$http.get("http://www.omdbapi.com/?s=" + movieApi.search).
			success(function(response) {
				movieApi.details = response.Search;
				console.log(movieApi.details);
				var imdb_idx,
					movie_plot,
					poster_path;

				movieApi.details.forEach(function(movie) {
					imdb_idx = movie.imdbID;

					var movieDbKey =  '';
					$http.get("http://api.themoviedb.org/3/find/" + imdb_idx + "?external_source=imdb_id&api_key=" + movieDbKey).
						success(function(response2) {
							poster_path = response2.movie_results[0].poster_path;
							movie_plot = response2.movie_results[0].overview;
							console.log(poster_path);
							
							console.log(response2.movie_results[0]);

							movie.poster_path = poster_path;
							movie.plot = movie_plot;
						});
				});

			});
	}

	/***********************************************
	** Save
	***********************************************/
	movieApi.save = function(imdbID) {
		$http.get("http://www.omdbapi.com/?i=" + imdbID + "&plot=short&r=json").
			success(function(response) {
				movieApi.fullMovieInfo = response;
				console.log(movieApi.fullMovieInfo);
				// Get poster and backdrop from movieDB
				var movieDbKey =  '';
				$http.get("http://api.themoviedb.org/3/find/" + movieApi.fullMovieInfo.imdbID + "?external_source=imdb_id&api_key=" + movieDbKey).
					success(function(response) {
						console.log(response.movie_results);
						movieApi.movieDb = response.movie_results[0];
						console.log(movieApi.movieDb);
						console.log(movieApi.movieDb.poster_path);
						console.log(movieApi.movieDb.backdrop_path);
				
						var movieAdd = {
							name: movieApi.fullMovieInfo.Title,
							name_original: movieApi.fullMovieInfo.Name_original,
							plot: movieApi.fullMovieInfo.Plot,
							year: movieApi.fullMovieInfo.Year,
							imdb_id: movieApi.fullMovieInfo.imdbID,
							movieDb_poster: movieApi.movieDb.poster_path,
							movieDb_backdrop: movieApi.movieDb.backdrop_path,
							imdb_rating: movieApi.fullMovieInfo.imdbRating,
							imdb_votes: movieApi.fullMovieInfo.imdbVotes,
							genre: movieApi.fullMovieInfo.Genre,
							length: movieApi.fullMovieInfo.Runtime,
							director: movieApi.fullMovieInfo.Director,
							writer: movieApi.fullMovieInfo.Writer,
							actors: movieApi.fullMovieInfo.Actors
						};

						$http.post("api/addMovie.php", movieAdd).
							success(function() {
								console.log('Film tillagd');
								console.log(movieAdd.name);
								console.log(movieAdd.movieDb_poster);
								console.log(movieAdd.movieDb_backdrop);
								// movieApi.movieDb = '';

								movieApi.addAlert();
							}).
							error(function(response) {
								movieApi.failInsertAlert();
								
							});
					
					});
				// movieApi.insertMovie();
			}).
			error(function(response) {
				//...
			});
	};

	/***********************************************
	** Alerts
	***********************************************/
	movieApi.alerts = [];

	movieApi.addAlert = function() {
		movieApi.alerts.push({ type: 'success', msg: 'Film tillagd till osedda.' });
	};

	movieApi.failInsertAlert = function() {
		movieApi.alerts.push({ type: 'danger', msg: 'Filmen fanns redan i databasen.' });
	};

	movieApi.closeAlert = function(index) {
		movieApi.alerts.splice(index, 1);
	};


});
