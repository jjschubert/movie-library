const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

//send updated movie
router.put('/', (req, res) => {
  console.log(req.body)
  const queryText = `UPDATE "movies"
  SET "title" = $1, "description" = $2
  WHERE "id" = $3;`;
  pool.query(queryText, [req.body.title, req.body.description, req.body.id] )
  .then( (result) => {
    res.sendStatus(200)
  }) .catch( (error) => {
    console.log('error in put', error);
    res.sendStatus(500);
  })
})

//get details for one movie
router.get('/:id', (req, res) => {
console.log(req.params.id)
  const queryText = `SELECT "movies".title, "movies".poster, "movies".description, "genres".name, "movies".id FROM "movies"
  JOIN "movies_genres" ON "movies".id = "movies_genres".movies_id
  JOIN "genres" ON "movies_genres".genres_id = "genres".id
  WHERE "movies".id = $1;`;
  pool.query(queryText, [req.params.id])
      .then( (result) => {
          res.send(result.rows);
      })
      .catch( (error) => {
          console.log(`Error on details query ${error}`);
          res.sendStatus(500);
      });
});


//get all movies
router.get('/', (req, res) => {
  // return all categories
  const queryText = `SELECT * FROM movies ORDER BY title ASC`;
  pool.query(queryText)
      .then( (result) => {
          res.send(result.rows);
      })
      .catch( (error) => {
          console.log(`Error on query ${error}`);
          res.sendStatus(500);
      });
});

//submit new movie
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Depending on how you make your junction table, this insert COULD change.
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movies_id", "genres_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY MAKES GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;