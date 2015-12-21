angular.module('songApp.controllers',[])

  .controller('songCtrl', ['$scope','SongFactory', '$stateParams', 'SongData', function($scope, SongFactory, $stateParams, SongData){

    $scope.heading = "Your current songs"
    $scope.songs = SongData;
    $scope.song = '';
    $scope.desc = "View the details, or the edit & delete buttons to modify/remove"

    $scope.removeSong = function(id){
       event.preventDefault();
       SongFactory.delete({"id":id},function(){ //utilize Resource's Delete method to make DELETE request to the api
         $scope.songs = SongFactory.query() //set the songs variable to the returned collection
       });
     }

  }])//end main controler

  .controller('songCreateCtrl', ['$scope','SongFactory', '$location', '$stateParams', '$state', 'SongGenres', function($scope, SongFactory, $location, $stateParams, $state, SongGenres){

      //geneal variables
      $scope.button = "Add Song!"
      $scope.heading="Add a new song!"
      $scope.desc ="Add a new title and lyrics in the fields below";

    //Related to song
    $scope.song = new SongFactory(); //instantiate new Song instance
    $scope.genres = SongGenres.list; //retrieve genre items from SongGenres factory service
    $scope.song.genre = "Unspecified"

    $scope.addSong = function(){ // our add song method

      var data = {  //create array to house our data
        title:$scope.song.title,
        lyrics:$scope.song.lyrics,
        genre:$scope.song.genre
      }

      SongFactory.save(data,function(){ //utilize Resource's SAVE method to make SAVE request to api on backend
        $scope.song.title="";   //clear input fields after save
        $scope.song.lyrics="";   //clear input fields after save
      }); //end save song

      $state.go($state.current, {}, {reload: true}); //reload the state to ensure resolve is triggered, and songlist is updated

    } //end addSong method

  }]) //end song create controler

  .controller('songEditCtrl', ['$scope','SongFactory', '$stateParams', '$state', 'SongGenres', function($scope, SongFactory, $stateParams, $state, SongGenres){

      //geneal variables
      $scope.button = "Upate Song!"
      $scope.heading = "Modify a song"
      $scope.desc = "Modify your song content below";

    $scope.genres = SongGenres.list; //Retrieve genres from SongGenres factory
    $scope.song = SongFactory.get({id:$stateParams.id}); //Utilize Resource's GET Method to make GET request to api on backend, and retrieve particular song object

    $scope.updateSong = function(){

     $scope.song.$update(function(){}); //Utilize our custom method to make PUT request to api on backend
     $state.go('home') //To esnure resolve is triggered, and to trigger refresh of song list

    }
  }]) //end song create controler

 .controller('songViewCtrl', ['$scope','SongFactory','$stateParams', function($scope, SongFactory,$stateParams){

    $scope.song = SongFactory.get({id:$stateParams.id}); //Utilize Resource's GET Method to make GET request to api on backend, and retrieve particular song object
    $scope.heading="Song Details"
    $scope.desc="Specific info about this song"

  }]); //end song view controler
