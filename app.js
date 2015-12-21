
/*** DEPENDENCIES ***/
var express = require('express'); //easier server management
var bodyParser = require('body-parser'); //to help parse post data server-side
var mongoose = require('mongoose'); //for easier db interactions

/*** DEPENDENCIES END***/

var app = express(); //create new app
var views = __dirname+'/public/views'; //establish public directory
app.use(express.static(__dirname+'/public')); //set static directory

app.use(bodyParser.json()); //middleware for parsing request bodies in json format
app.use(bodyParser.urlencoded({extended:false})); //middleware for parsing request bodies in urlencoded format

/********** DB CONN, SCHEMA & MODELS *****************/

mongoose.connect("mongodb://localhost/songs"); // Try to connect to songs collection in db

  var db = mongoose.connection; //set the db variable
  db.on('error', console.error.bind(console, "error:")); //if connection fails
  db.once('open', function(callback){ //once connection is open
    console.log("successfully connected to mongo");
  });

  //Use Mongoose to create our schema to map to the Song collection

  var songSchema = mongoose.Schema({
      title:String,
      lyrics:String,
      genre:String
  });

  var Song = mongoose.model('Song',songSchema); //create a Song model

/********** DB CONN, SCHEMA & MODELS END *****************/

/********** CRUD API OPERATIONS *****************/

//CREATE new song document in collection
app.post('/api/songs',function(req,res,next){
  var song = new Song(req.body); //create instance of Song object and populates with posted data
  song.save(function(err, song){ //saves new song document to Mongo, and returns status
    if(err) throw err;
    res.json({ message:"Song successfully added to db", song:song });
   }); //end save
}); //end new song create

//READ ALL songs in collection
app.get('/api/songs',function(req,res,next){
  Song.find({}, function(err, song){
    res.json(song)
  });
})

//READ a specific song in the collection based on the id passed as url param
app.get('/api/songs/:id',function(req,res){
  Song.findById(req.params.id,function(err, song){
    res.json(song)
  })
});

//UPDATE specific song in collection based on url param
app.put('/api/songs/:id',function(req,res,next){
    Song.findById(req.params.id, function(err,song){  //find specific song by id

      //update song's properties with new values
      song.title = req.body.title;
      song.lyrics = req.body.lyrics;
      song.genre = req.body.genre;


      song.save(function(err){ // save the current song object with updated properties
        if(err){
          return res.status(400).send({
            message:getErrorMessage(err)
          });
        }
        else{
          res.json(song);
          console.log(song.title+" has been updated");
        }
      });//end save function
    }) //end findById callback
}) //end update call

//DELETE song in db based on id in url param
app.delete('/api/songs/:id',function(req,res,next){
    Song.findByIdAndRemove(req.params.id, function(err){   //locate and remove particular song in collection
      if(err)
      res.send(err);
      res.json({
        message:"Song removed from collection"
      });
    });
  }); //end delete call

/********** CRUD API OPERATIONS END *****************/

/********** ROUTES & SERVER *****************/

app.get('/',function(req,res){
  res.sendFile(views+'/index.html'); //always server index.html
});

app.get('*',function(req,res){
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(fullUrl)
res.redirect('/')
});

app.listen(3000, function(){
  console.log('listening on 3000');   //Let us know we are up and running...
})

/********** ROUTES & SERVER STARTRUP *****************/
