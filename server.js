// long live https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var url = process.env.MONGOLAB_URI;

// ADDED LATER

var Chicken = require('./models/chicken');
//const file_path = "./DB/users.json";

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


let mongoose = require('mongoose');
mongoose.connect(url, {useNewUrlParser: true}, (err) => {
    if (err) throw err;
    console.log('connected to db');
});

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------



// all of our routes will be prefixed with /api   !important ffs, 
// when you get the url, place /api behind, in front of the route




// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

router.route('/chicken')
    .get(function(req, res) { 

        var cat = req.query.category;
        console.log(cat, " fockin ,", req.query.id);
        if (cat != undefined) {
            console.log("test1");
            Chicken.find({ 'category': `${cat}` }, function (err, chicken) {
                console.log("test2");
                if (err) return handleError(err);
                res.send(Chicken);
            });              
        } else if (req.query.id){
            Chicken.findOne({ id: req.query.id }, function (err, chicken) {
                console.log("test2.5");
                if (err) return handleError(err);
                res.send(Chicken);
            }); 
        } else {
            console.log("test3");
            Chicken.find(function(err, chicken) {
            if (err) {
                console.log("test3.1");
                res.send(err);
            } else {
                console.log("test3.2 + chicken?");
                res.json(chicken);
            }
         })  
        }
        console.log("test4");
        //res.json({ message: 'hooray! welcome to our api!' });   
    })

    // create a chicken (accessed at POST http://localhost:8080/api/chickens)
    .post(function(req, res) {

        var Chick = new Chicken();      // create a new instance of the chicken model
        Chick.pun = req.body.pun;  // set the chickens name (comes from the request)
        Chick.category = req.body.category;

        // save the chicken and check for errors
        Chick.save(function(err) {
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

router.route('/bear')
    .get(function(req, res) { 
    Chicken.find(function (err, chick) {
        if (err) {
            res.send(err);
        } else {
            res.json(chick);
        }
    })        

    res.json({ message: 'hooray! welcome to our api!' });   
});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api


app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);