// long live https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var url = process.env.MONGOLAB_URI;

//pw:d4b85e?


  

// ADDED LATER

var Chicken = require('./eggsquisite-mongo-app/models/chicken');
//const file_path = "./DB/users.json";

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


let mongoose = require('mongoose');
mongoose.connect(url, {useNewUrlParser: true}, (err) => {
    if (err) throw err;
    console.log('connected to db')
});


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

router.route('/chicken')

    .get(function(req, res) {
        // if (req.name)  {    
        //     let user;  
        //     let uniqueName = req.name;
        //     jsonfile.readFile(file_path, function(err, content) {
        //         for (var i = content.length - 1; i >= 0; i--) {
        //           console.log("why reverse? ", i, " ", content[i].name, " ", name);
        //             if (content[i].name === uniqueName) {
        //                 console.log("found user" + content[i]);
        //                 console.log(content[i]);
        //                 user = content[i];
        //                 userFound=true;
        //             }
        //         }
        //         if (userFound) {res.send(user);} 
        //         else {res.send(content);};
            
        //       });
        // }

        res.json({ message: 'hooray! welcome to our api!' });   
    })



    // create a chicken (accessed at POST http://localhost:8080/api/chickens)
    .post(function(req, res) {

        var chicken = new chicken();      // create a new instance of the chicken model
        chicken.name = req.body.name;  // set the chickens name (comes from the request)

        // save the chicken and check for errors
        chicken.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'chicken created!' });
        });

    })

    .put(function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });   
    })

    .delete(function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });   
    });


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);