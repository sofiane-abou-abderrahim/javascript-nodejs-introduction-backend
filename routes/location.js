const express = require('express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const router = express.Router();

// Connection URL
const url =
  'mongodb+srv://sr1:<password>@cluster0.mztbbsh.mongodb.net/locations?retryWrites=true&w=majority';

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

router.get('/location/:lid', (req, res, next) => {
  const locationId = req.params.lid;

  client.connect(function (err, client) {
    const db = client.db('locations');

    // THIS WAS ADDED
    let locationId;
    try {
      locationId = new mongodb.ObjectId(locationId);
    } catch (error) {
      // return to make sure the other code does not execute
      return res.status(500).json({ message: 'Invalid id!' });
    }
    // END OF ADDED CODE

    // Insert a single document
    db.collection('user-locations').findOne(
      {
        _id: locationId // will only be reached if the above code didn't throw an error
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
