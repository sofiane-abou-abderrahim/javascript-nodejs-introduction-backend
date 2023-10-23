const express = require('express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const router = express.Router();

const url = 'mongodb://127.0.0.1:27017/locations?retryWrites=true&w=majority';

const client = new MongoClient(url);

// const locationStorage = {
//     locations: [],
// };

router.post('/add-location', async (req, res, next) => {
  // const id = Math.random();
  await client
    .connect()
    .then(async client => {
      const db = client.db('locations');

      // Insert a single document
      const r = await db.collection('user-locations').insertOne({
        address: req.body.address,
        coords: { lat: req.body.lat, lng: req.body.lng }
      });
      // console.log(r);
      res.json({
        message: 'Stored location!',
        locId: r.insertedId
      });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });

  // locationStorage.locations.push({
  //   id: id,
  //   address: req.body.address,
  //   coords: { lat: req.body.lat, lng: req.body.lng }
  // });
});

router.get('/location/:lid', async (req, res, next) => {
  const locationId = req.params.lid;

  await client
    .connect()
    .then(async client => {
      const db = client.db('locations');

      // Insert a single document
      const doc = await db.collection('user-locations').findOne({
        _id: new mongodb.ObjectId(locationId)
      });
      // if (err) {}
      if (!doc) {
        return res.status(404).json({ message: 'Not found!' });
      }
      res.json({ address: doc.address, coordinates: doc.coords });
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
});

module.exports = router;
