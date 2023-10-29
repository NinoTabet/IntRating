require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

const corsOptions = {
  origin: 'https://www.intrating.net', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json());

// player rating logic
app.post("/rating", async (req, res) => {
  try {
    const { original_username, server_name } = req.body;

    // Check if player in the specified server exists
    const playerCheck = await pool.query(
        "SELECT * FROM player WHERE lower_username = LOWER($1) AND server_id = (SELECT server_id FROM server WHERE server_name = $2)",
        [original_username, server_name]
    );
    // Create a new player if no player exists
    if (playerCheck.rows.length === 0) {
        const newPlayer = await pool.query(
        "INSERT INTO player (original_username, lower_username, server_id) VALUES($1, LOWER($2), (SELECT server_id FROM server WHERE server_name = $3)) RETURNING player_id",
        [original_username, original_username, server_name]
      );

        // Extract player_id from the result
        player_id = newPlayer.rows[0].player_id;
    } else {
        // Player already exists, get player_id from the check result
        player_id = playerCheck.rows[0].player_id;
    }
    const {
        creep_score,
        map_awareness_score,
        team_fighting_score,
        feeding_score,
        toxicity_score,
        tilt_score,
        kindness_score,
        laning_score,
        carry_score,
        shot_calling_score,
        play_again,
    } = req.body;
    
    if (
      [creep_score, map_awareness_score, team_fighting_score, feeding_score, toxicity_score, tilt_score, kindness_score, laning_score, carry_score, shot_calling_score].some(score => score < 0 || score > 10)
    ) {
      return res.status(400).json({ message: "All scores must be between 0 and 10." });
    }
    
    // Input into the ratings table with the request info
    const rating = await pool.query(
      "INSERT INTO ratings (player_id, creep_score, map_awareness_score, team_fighting_score, feeding_score, toxicity_score, tilt_score, kindness_score, laning_score, carry_score, shot_calling_score, play_again) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [
          player_id,
          creep_score,
          map_awareness_score,
          team_fighting_score,
          feeding_score,
          toxicity_score,
          tilt_score,
          kindness_score,
          laning_score,
          carry_score,
          shot_calling_score,
          play_again
      ]
    );

      // Check if the rating insertion was successful
      if (rating.rows.length > 0) {
          res.json(rating.rows[0]);
      } else {
          res.status(500).json("Failed to insert rating");
      }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// player search
app.get("/search", async (req, res) => {
    try {
      console.log("Search route hit");
  
      const { original_username, server_name } = req.query;
  
      // Note: You should adjust the SQL query to match your database schema
      const searchPlayer = await pool.query(
      "SELECT * FROM player WHERE lower_username = LOWER($1) AND server_id = (SELECT server_id FROM server WHERE server_name = $2)",
        [original_username, server_name]
      );
  
      if (searchPlayer.rows.length > 0) {
        // If a player is found, respond with the player details
        const playerFound = await pool.query(
          "SELECT original_username FROM player WHERE lower_username = LOWER($1) AND server_id = (SELECT server_id FROM server WHERE server_name = $2)",
          [original_username, server_name]
        )
        console.log(playerFound.rows[0])
        res.json(playerFound.rows[0]);
      } else {
        res.status(404).json({ message: "Player not found" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
});

//gets all server names
app.get("/servers", async (req, res) => {
    try {
      const servers = await pool.query("SELECT server_name FROM server");
      res.json(servers.rows.map(server => server.server_name));
    } catch (err) {
      console.error(err.message);
    }
});

// updates avg scores
app.post("/api/update-averages", async (req, res) => {
  try {
    const { original_username, server_name } = req.body;

    // Locate player id
    const playerResult = await pool.query(
      "SELECT player_id FROM player WHERE lower_username = LOWER($1) AND server_id = (SELECT server_id FROM server WHERE server_name = $2)",
      [original_username, server_name]
    );
    const player_id = playerResult.rows[0]?.player_id;

    // Check if there is an existing entry for the player_id
    const existingEntry = await pool.query(
      "SELECT * FROM average_ratings WHERE player_id = $1",
      [player_id]
    );

    const reviews = await pool.query(
      "SELECT * FROM ratings WHERE player_id = $1",
      [player_id]
    );

    const averageScores = {
      creep_score: calculateAverage(reviews.rows, 'creep_score'),
      map_awareness_score: calculateAverage(reviews.rows, 'map_awareness_score'),
      team_fighting_score: calculateAverage(reviews.rows, 'team_fighting_score'),
      feeding_score: calculateAverage(reviews.rows, 'feeding_score'),
      toxicity_score: calculateAverage(reviews.rows, 'toxicity_score'),
      tilt_score: calculateAverage(reviews.rows, 'tilt_score'),
      kindness_score: calculateAverage(reviews.rows, 'kindness_score'),
      laning_score: calculateAverage(reviews.rows, 'laning_score'),
      carry_score: calculateAverage(reviews.rows, 'carry_score'),
      shot_calling_score: calculateAverage(reviews.rows, 'shot_calling_score'),
      play_again: calculateAverage(reviews.rows, 'play_again'),
    };

    console.log('Player ID:', player_id);
    console.log('Average Scores:', averageScores);

    if (existingEntry.rows.length === 0) {
      // If there is no existing entry, perform an INSERT
      // ... other code

      // If there is no existing entry, perform an INSERT
      await pool.query(
        "INSERT INTO average_ratings (player_id, creep_score_avg, map_awareness_score_avg, team_fighting_score_avg, feeding_score_avg, toxicity_score_avg, tilt_score_avg, kindness_score_avg, laning_score_avg, carry_score_avg, shot_calling_score_avg, play_again_avg, overall_avg, last_click_timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, COALESCE((SELECT AVG((creep_score_avg + map_awareness_score_avg + team_fighting_score_avg + feeding_score_avg + toxicity_score_avg + tilt_score_avg + kindness_score_avg + laning_score_avg + carry_score_avg + shot_calling_score_avg + play_again_avg) / 11) FROM average_ratings WHERE player_id = $1), 0), NOW())",
        [
          player_id,
          averageScores.creep_score,
          averageScores.map_awareness_score,
          averageScores.team_fighting_score,
          averageScores.feeding_score,
          averageScores.toxicity_score,
          averageScores.tilt_score,
          averageScores.kindness_score,
          averageScores.laning_score,
          averageScores.carry_score,
          averageScores.shot_calling_score,
          averageScores.play_again,
        ]
      );
    } else {
      // If there is an existing entry, perform an UPDATE
      await pool.query(
        "UPDATE average_ratings SET creep_score_avg = $1, map_awareness_score_avg = $2, team_fighting_score_avg = $3, feeding_score_avg = $4, toxicity_score_avg = $5, tilt_score_avg = $6, kindness_score_avg = $7, laning_score_avg = $8, carry_score_avg = $9, shot_calling_score_avg = $10, play_again_avg = $11, last_click_timestamp = NOW(), overall_avg =(SELECT AVG((creep_score_avg + map_awareness_score_avg + team_fighting_score_avg + feeding_score_avg + toxicity_score_avg + tilt_score_avg + kindness_score_avg + laning_score_avg + carry_score_avg + shot_calling_score_avg + play_again_avg) / 11) AS overall_avg FROM average_ratings WHERE player_id = $12) WHERE player_id = $12",
        [
          averageScores.creep_score,
          averageScores.map_awareness_score,
          averageScores.team_fighting_score,
          averageScores.feeding_score,
          averageScores.toxicity_score,
          averageScores.tilt_score,
          averageScores.kindness_score,
          averageScores.laning_score,
          averageScores.carry_score,
          averageScores.shot_calling_score,
          averageScores.play_again,
          player_id,
        ]
      );
    }

    res.status(200).send('Averages updated successfully');
  } catch (error) {
    console.error('Error updating averages:', error.message);
    await pool.query('ROLLBACK'); // Rollback the transaction in case of an error
    res.status(500).send('Internal Server Error');
  }

  function calculateAverage(reviews, columnName) {
    const totalScore = reviews.reduce((sum, review) => sum + review[columnName], 0);
    const averageScore = totalScore / reviews.length;
    return averageScore;
  }
});

// pulls avg scores and total # of ratings of specified user
app.get("/api/collect-averages", async (req, res) => {
  try {
    const { original_username, server_name } = req.query;

    const player_id_result = await pool.query(
      "SELECT player_id FROM player WHERE lower_username = LOWER($1) AND server_id = (SELECT server_id FROM server WHERE server_name = $2)",
      [original_username, server_name]
    );
    const player_id = player_id_result.rows[0]?.player_id;

    const updated_player_averages = await pool.query(
      "SELECT * FROM average_ratings WHERE player_id = $1",
      [player_id]
    );

    const total_number_of_ratings = await pool.query(
      "SELECT COUNT(*) FROM ratings WHERE player_id = $1",
      [player_id]
    );
    
    const responseData = {
      total_number_of_ratings: total_number_of_ratings.rows[0],
      updated_player_averages: updated_player_averages.rows[0],
    };

    res.json(responseData);

  } catch (error) {
    console.error('Error collecting averages:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/feedback", async (req, res) => {
  try {
    const {feedback} = req.body;
    const feedbackValue = feedback.trim() === "" ? null : feedback;
    await pool.query(
      "INSERT INTO feedback (feedback) VALUES ($1)",
      [feedbackValue]
  );
  res.status(200).json({ message: 'Thanks for the feedback! It has successfully been submitted to the developer.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
}
});

app.get("/total_ratings", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT MAX(rating_id) as latestRatingId FROM ratings"
    );

    const latestRatingId = result.rows[0].latestratingid; // Updated this line
    res.json({ latestRatingId });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" }); 
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});