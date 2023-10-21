const express = require('express');
const mongodb = require('mongodb').MongoClient;
const MongoClient = mongodb.MongoClient;

const router = express.Router();

// Connection URL
const url =
  'mongodb+srv://sr1:1wSW89jse7Em5OE2@cluster0.mztbbsh.mongodb.net/locations?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(url);

const locationStorage = {
  locations: []
};

router.post('/add-location', (req, res, next) => {
  // const id = Math.random();
  // Use connect method to connect to the Server
  client.connect(function (err, client) {
    const db = client.db('locations');

    // Insert a single document
    db.collection('user-locations').insertOne(
      {
        address: req.body.address,
        coords: {
          lat: req.body.lat,
          lng: req.body.lng
        }
      },
      function (err, r) {
        // if (err) {}
        console.log(r);
        res.json({ message: 'Stored location!', locId: r.insertedId }); // send back the id in our response so that the client can generate a link with the id in it
      }
    );
  });

  // locationStorage.locations.push({
  //   id: id,
  //   address: req.body.address,
  //   coords: {
  //     lat: req.body.lat,
  //     lng: req.body.lng
  //   }
  // });
});

// we retrieve the data for a given ID
router.get('/location/:lid', (req, res, next) => {
  // we add an extra segment /:lid to the path for which we filter where we tell to ExpressJS that we have a dynamic segment
  // Express will handle the URL which contains the ID as part of the URL that we get from the frontend
  const locationId = req.params.lid; // we retrieve that ID with the "params" that ExpressJS provides to us

  client.connect(function (err, client) {
    const db = client.db('locations');

    // Insert a single document
    db.collection('user-locations').findOne(
      {
        _id: new mongodb.ObjectId(locationId)
      },
      function (err, doc) {
        // if (err) {}
        if (!doc) {
          return res.status(404).json({ message: 'Not found!' });
        }
        res.json({ address: doc.address, coordinates: doc.coords });
      }
    );
  });
});

module.exports = router;
