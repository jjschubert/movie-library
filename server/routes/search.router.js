const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/:id', (req, res) => {
   //search by genre_id
   let queryText = ''
   console.log(req.params)
   let idFormatted = Number(req.params.id)
   console.log('test', idFormatted)
   //if string, search DB by title
if (isNaN(idFormatted)) {
    queryText = `SELECT "movies".title, "movies".poster, "movies".description, "genres".name, "movies".id FROM "movies"
    JOIN "movies_genres" ON "movies".id = "movies_genres".movies_id
    JOIN "genres" ON "movies_genres".genres_id = "genres".id
    WHERE "movies".title ILIKE '%' || $1 || '%';`;
    //if number, search DB by genre_id
} else {
    queryText = `SELECT "movies".title, "movies".poster, "movies".description, "genres".name, "movies".id FROM "movies"
    JOIN "movies_genres" ON "movies".id = "movies_genres".movies_id
    JOIN "genres" ON "movies_genres".genres_id = "genres".id
    WHERE "genres".id = $1;`;
}
    pool.query(queryText, [req.params.id])
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
            console.log(`Error on genre_id query ${error}`);
            res.sendStatus(500);
        });
  });


module.exports = router;