var app = angular.module('songApp',['ui.router', 'ngResource', 'songApp.controllers', 'songApp.services']); //Declare our main module and its module & service dependencies

/* FRONTEND ROUTES/STATES FOR LOADING DIFFERENT VIEWS, ASSIGNING CONTROLLERS AND RETURNING DATA FROM RESOURCE QUERY AS A RESOLVE */
app.config(function($stateProvider, $urlRouterProvider, $locationProvider){

  $urlRouterProvider.otherwise('songs'); //default to /songs 

    $stateProvider

    .state('home',{ //this is the default, home state
      url:'/songs',
      views:{
        'left':{
          templateUrl:'/views/new.html', //new song template
          controller:'songCreateCtrl'
        },
        'right':{
          templateUrl:'/views/list.html', //song list template
          controller:'songCtrl',
          resolve:{ //we want to refresh song data when this view is loaded after state change so our list is up-to-date
            SongData:  function(SongFactory){
              return SongFactory.query()
           }
        }
        }
      }//end views
    })

    .state('songView',{  //this is when viewing details for a particular song
      url:'/songs/:id',
      views:{
        'left':{
          templateUrl:'/views/details.html', //song details template
          controller:'songViewCtrl'
        },
        'right':{
          templateUrl:'/views/list.html', //song list template
          controller:'songCtrl',
          resolve:{ //we want to refresh song data when this view is loaded after state change so our list is up-to-date
            SongData:  function(SongFactory){
              return SongFactory.query()
           }
         }
        }
      }//end views
    })

    .state('editSong',{ //this state is for when editing a song
      url:'/song/:id',
      views:{
        'left':{
          templateUrl:'/views/edit.html', //song edit template
          controller:'songEditCtrl'
        },
        'right':{
          templateUrl:'/views/list.html', //song list template
          controller:'songCtrl',
          resolve:{ //we want to refresh song data when this view is loaded after state change so our list is up-to-date
            SongData:  function(SongFactory){
              return SongFactory.query()
           }
         }
        }
      } //end views
    });
  $locationProvider.html5Mode(true); //to get rid of # in url

});
