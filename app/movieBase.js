

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
			controller 	: 'addMovieCtrl',
			controllerAs : 'vm'
		});

		$locationProvider.html5Mode(true);
});


movieBase.controller('homeCtrl', function() {
	var home = this;

	home.seen = [
		{
			idx : 1,
			name : 'Blade Runner',
			genre : 'Sci-Fi',
			rating : 10,
			year: 1982
		},
		{
			idx : 2,
			name : 'Alien',
			genre : 'Sci-Fi',
			rating : 10,
			year: 1979
		},
		{
			idx : 3,
			name : 'Star Wars: Episode IV - A New Hope',
			genre : 'Sci-Fi',
			rating : 10,
			year: 1977
		},
		{
			idx : 4,
			name : 'Star Wars: Episode V - The Empire Strikes Back',
			genre : 'Sci-Fi',
			rating : 10,
			year: 1980
		},
		{
			idx : 5,
			name : 'Star Wars: Episode VI - Return of the Jedi',
			genre : 'Sci-Fi',
			rating : 10,
			year: 1983
		},
		{
			idx : 6,
			name : 'Ex Machina',
			genre : 'Sci-Fi',
			rating : 8,
			year: 2015
		},
		{
			idx : 7,
			name : 'Interstellar',
			genre : 'Sci-Fi',
			rating : 10,
			year: 2014
		},
		{
			idx : 8,
			name : 'Casablanca',
			genre : 'Drama',
			rating : 10,
			year: 1942
		},
		{
			idx : 9,
			name : 'The Maltese Falcon',
			genre : 'Film-Noir',
			rating : 10,
			year: 1941
		},
		{
			idx : 10,
			name : 'The Third Man',
			genre : 'Film-Noir',
			rating : 10,
			year: 1949
		},
	];

	home.unseen = [
		{
			idx : 1,
			name : 'Mad Max: Fury Road',
			genre : 'Action',
			rating : '8.4',
			year : 2015
		},
		{
			idx : 2,
			name : 'Dark City',
			genre : 'Sci-Fi',
			rating : '7.7',
			year : 1998
		},
		{
			idx : 3,
			name : 'The Man from U.N.C.L.E',
			genre : 'Action',
			rating : '?',
			year : 2015
		},
		{
			idx : 4,
			name : 'Minions',
			genre : 'Comedy',
			rating : '6.7',
			year : 2015
		},
		{
			idx : 5,
			name : 'Southpaw',
			genre : 'Drama',
			rating : '7.9',
			year : 2015
		},
		{
			idx : 6,
			name : 'American Ultra',
			genre : 'Action',
			rating : '?',
			year : 2015
		},
		{
			idx : 7,
			name : 'Suicide Squad',
			genre : 'Action',
			rating : '?',
			year : 2015
		},
		{
			idx : 8,
			name : 'Batman v Superman: Dawn of Justice',
			genre : 'Action',
			rating : '?',
			year : 2015
		},
		{
			idx : 9,
			name : 'Deadpool',
			genre : 'Action',
			rating : '?',
			year : 2016
		},
		{
			idx : 10,
			name : 'Spectre',
			genre : 'Action',
			rating : '?',
			year : 2015
		}
	];
});

movieBase.controller('addMovieCtrl', function() {
	var addMovies = this;

	addMovies.add = [];

	addMovies.addMovie = function() {
		var moviesAdd = {
			name: addMovie.name,
			genre: addMovie.genre,
			rating: addMovie.rating,
			year: addMovie.year
		};
		addMovies.add.push(moviesAdd);
	};
});
