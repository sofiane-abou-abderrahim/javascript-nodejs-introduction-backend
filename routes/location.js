const express = require('express');

const router = express.Router();

const locationStorage = {
  locations: []
};

router.post('/add-location', (req, res, next) => {
  const id = Math.random();
  locationStorage.locations.push({
    id: id,
    address: req.body.address,
    coords: {
      lat: req.body.lat,
      lng: req.body.lng
    }
  });
  res.json({ message: 'Stored location!', locId: id }); // send back the id in our response so that the client can generate a link with the id in it
});

router.get('/location', (req, res, next) => {});

module.exports = router;
