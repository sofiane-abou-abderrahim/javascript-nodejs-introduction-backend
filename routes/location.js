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

// we retrieve the data for a given ID
router.get('/location/:lid', (req, res, next) => {
  // we add an extra segment /:lid to the path for which we filter where we tell to ExpressJS that we have a dynamic segment
  // Express will handle the URL which contains the ID as part of the URL that we get from the frontend
  const locationId = +req.params.lid; // we retrieve that ID with the "params" that ExpressJS provides to us
  const location = locationStorage.locations.find(loc => {
    return loc.id === locationId;
  });
  if (!location) {
    return res.status(404).json({ message: 'Not found!' });
  }
  res.json({ address: location.address, coordinates: location.coords });
});

module.exports = router;
