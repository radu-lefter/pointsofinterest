const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

/* GET pois */
router.get('/', async function(req, res, next) {
  try {
    res.json(await controllers.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting points of interest `, err.message);
    next(err);
  }
});

/* GET pois by region */
router.get('/region', async function(req, res, next) {
  try {
    res.json(await controllers.getByRegion(req.query.region));
  } catch (err) {
    console.error(`Error while getting points of interest `, err.message);
    next(err);
  }
});

/* POST poi */
router.post('/', async function(req, res, next) {
    try {
      console.log(req.body)
      res.json(await controllers.create(req.body));
    } catch (err) {
      console.error(`Error while creating point of interest`, err.message);
      next(err);
    }
  });

/* PUT poi */
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await controllers.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating poi`, err.message);
      next(err);
    }
  });

/* DELETE poi */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await controllers.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting poi`, err.message);
      next(err);
    }
  });

/* PUT rec */
router.put('/recommend/:id', async function(req, res, next) {
    try {
      res.json(await controllers.recommend(req.params.id));
    } catch (err) {
      console.error(`Error while updating poi rec`, err.message);
      next(err);
    }
  });


module.exports = router;