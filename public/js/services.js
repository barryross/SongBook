
angular.module('songApp.services',[]) //create song service to interact with MongoDB backend through our APIs

  .factory('SongFactory', function($resource){ //utilize resource to make interacting with RESTful API easy
        return $resource('api/songs/:id', {id:'@_id'}, {
        update: { //add update method b/c resource doesn't come with this as a method
          method:'PUT'
        }
    })
  })
  
  .factory('SongGenres', function(){ //create new service so we can use genres array in multiple controllers
      var genres = {};
      genres.list = ["Unspecified","Jazz", "Blues", "Folk", "Country"];

    return genres;
  });
