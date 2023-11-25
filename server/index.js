require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const bcrypt = require('bcryptjs');
const saltRounds = 12;
const jwt = require('jsonwebtoken');
const axios = require('axios');

app.use(cors());
app.use(express.json());

const RIOT_API = process.env.RIOT_API;

// middleware jwt auth
function verifyToken(req, res, next) {
  try {
    const token = req.headers['authorization'];

    // Check if the token is not present
    if (!token) {
      console.log('Unauthorized: Token not found');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the token
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
      if (err) {
         console.log('Forbidden: Token verification failed');
         console.error(err);
         return res.status(403).json({ message: 'Forbidden' });
      }
   
      console.log('Token verified successfully:', user);
      req.user = user;
      next();
   });
   
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// player rating logic
app.post("/rating", verifyToken, async (req, res) => {
  try {
    const { full_username, server_name } = req.body;
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({ message: "Invalid user ID" });
    }

    // Extract username and tag_line from full_username
    let original_username, tag_line;
    try {
      [original_username, tag_line] = extractUsernameAndTagline(full_username);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    console.log("username: "+original_username + " tagline: "+tag_line);
    // Check if player in the specified server exists
    const playerCheck = await pool.query(
      "SELECT * FROM player WHERE lower_username = LOWER($1) AND server_id = (SELECT server_id FROM server WHERE server_name = $2) AND tag_line = UPPER($3)",
      [original_username, server_name, tag_line]
    );

    let player_id;

    // Create a new player if no player exists
    if (playerCheck.rows.length === 0) {
      const newPlayer = await pool.query(
        "INSERT INTO player (original_username, lower_username, tag_line, server_id) VALUES($1, LOWER($2), UPPER($3), (SELECT server_id FROM server WHERE server_name = $4)) RETURNING player_id",
        [original_username, original_username, tag_line, server_name]
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
        review,
    } = req.body;
    
    if ([creep_score, map_awareness_score, team_fighting_score, feeding_score, toxicity_score, tilt_score, kindness_score, laning_score, carry_score, shot_calling_score].some(score => score < 1 || score > 5))
    {
      return res.status(400).json({ message: "All scores must be between 1 and 5." });
    }
    
    const checkPreviousRating = await pool.query(
      "SELECT * FROM ratings WHERE player_id = $1 AND user_id = $2;",
      [player_id,userId]
    )

    let rating; // Declare rating outside the try block to access it later

    if (!checkPreviousRating.rows.length) {
      // Input into the ratings table with the request info
      rating = await pool.query(
        "INSERT INTO ratings (player_id, user_id,creep_score, map_awareness_score, team_fighting_score, feeding_score, toxicity_score, tilt_score, kindness_score, laning_score, carry_score, shot_calling_score, play_again, review) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
        [
          player_id,
          userId,
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
          review,
        ]
      );
    } else {
      const updateRating = await pool.query(
        `UPDATE ratings 
        SET 
          creep_score = $3,
          map_awareness_score = $4,
          team_fighting_score = $5,
          feeding_score = $6,
          toxicity_score = $7,
          tilt_score = $8,
          kindness_score = $9,
          laning_score = $10,
          carry_score = $11,
          shot_calling_score = $12,
          play_again = $13,
          review = $14
        WHERE player_id = $1 AND user_id = $2
        RETURNING *`,
        [
          player_id,
          userId,
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
          review,
        ]
      );
      // Assign the updated rating to the variable
      rating = updateRating;
    }

    // Check if the rating insertion or update was successful
    if (rating.rows.length > 0) {
      res.json(rating.rows[0]);
    } else {
      res.status(500).json("Failed to insert/update rating");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// profile info load
app.get("/profile", verifyToken, async (req, res) => {
  // userId associated with the token
  const userId = req.user.userId;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized request. Please log in before performing this action." });
  }

  try {
    // searches for all reviews associated with the userId found in the jwt
    const reviewSearch = await pool.query(
      "SELECT r.*, u.username AS reviewer_username, p.original_username AS reviewed_username " +
      "FROM ratings r " +
      "JOIN user_accounts u ON r.user_id = u.user_id " +
      "JOIN player p ON r.player_id = p.player_id " +
      "WHERE r.user_id = $1",
      [userId]
    );

    const usernameSearch = await pool.query(
      "SELECT username FROM user_accounts WHERE user_id = $1",
      [userId]
    );

    const responseData = {
      reviewSearch: reviewSearch.rows,
      usernameSearch: usernameSearch.rows[0],
    };

    res.json(responseData);
  } catch (error) {
    return res.status(400).json({ message: "Unauthorized request. " });
  }
});

// !!---------- After this line, jwt is not needed ----------!!

// player search
app.get("/search", async (req, res) => {
    try {
      console.log("Search route hit");
  
      const { full_username, server_name } = req.query;
  
         // Extract username and tag_line from full_username
    let original_username, tag_line;
    try {
      [original_username, tag_line] = extractUsernameAndTagline(full_username);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

      // Note: You should adjust the SQL query to match your database schema
      const searchPlayer = await pool.query(
      "SELECT original_username, tag_line FROM player WHERE lower_username = LOWER($1) AND server_id = (SELECT server_id FROM server WHERE server_name = $2) AND tag_line = UPPER($3)",
        [original_username, server_name, tag_line]
      );
  
      if (searchPlayer.rows.length > 0) {
        // If a player is found, respond with the player details
        const playerFound = await pool.query(
          "SELECT original_username, tag_line FROM player WHERE lower_username = LOWER($1) AND server_id = (SELECT server_id FROM server WHERE server_name = $2)",
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

// gets all server names
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
    const { original_username, server_name, tag_line } = req.body;

    // Locate player id
    const playerResult = await pool.query(
      "SELECT player_id FROM player WHERE lower_username = LOWER($1) AND server_id = (SELECT server_id FROM server WHERE server_name = $2) AND tag_line = UPPER($3)",
      [original_username, server_name, tag_line]
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

// feedback form logic
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

// front page total ratings count logic
app.get("/total_ratings", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT MAX(rating_id) as latestRatingId FROM ratings"
    );

    const latestRatingId = result.rows[0].latestratingid;
    res.json({ latestRatingId });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" }); 
  }
});

app.get("/api/text_review", async (req, res) => {
  try {
    const { username, server_name } = req.query;

    const reviews = await pool.query(
      "SELECT * FROM ratings WHERE player_id = (SELECT player_id FROM player WHERE lower_username = LOWER($1) AND server_id = (SELECT server_id FROM server WHERE server_name = $2))",
      [username, server_name]
    );

    const usernames = await pool.query(
      "SELECT username FROM user_accounts WHERE user_id = (SELECT user_id FROM player WHERE lower_username = LOWER($1) AND server_id = (SELECT server_id FROM server WHERE server_name = $2))",
      [username, server_name]
    );

    // Extract the usernames from the result
    const userNamesList = usernames.rows.map(user => user.username);

    // Combine the reviews and usernames in the response
    const responseData = {
      reviews: reviews.rows,
      usernames: userNamesList,
    };

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// user signup api
app.post("/signup", async (req, res) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
  const { email_address, password, username } = req.body;
  try {
    // checks if account with provided email exists
    const accountEmailCheck = await pool.query(
      "SELECT email FROM user_accounts WHERE email = LOWER($1)",
      [email_address]
    );

    // checks if account with provided username was provided already exists
    const accountUsernameCheck = await pool.query(
      "SELECT lower_username FROM user_accounts WHERE username = LOWER($1)",
      [username]
    );

    if (accountEmailCheck.rows.length > 0) {
      return res.status(400).send("Email is already in use. If you forgot your password please click the \"Forgot password\" button!");
    } else if (accountUsernameCheck.rows.length > 0) {
      return res.status(400).send("Username is already in use. Please choose another username.");
    } else {
      if (!passwordRegex.test(password)) {
        return res.status(400).send("password does not meet stated security requirements.");
      } else {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userSignUp = await pool.query(
          "INSERT INTO user_accounts (email, username, lower_username, password) VALUES (LOWER($1), ($2), LOWER($3), $4)",
          [email_address, username, username, hashedPassword]
        );
        return res.status(200).send("Account created successfully");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// user login api
app.post("/login", async(req, res)=>{
  const { email_address, password } = req.body;
  try {
    // check to see if email exists in db
    // if it does, then the user_id is selected
    const user = await pool.query(
      "SELECT user_id, password FROM user_accounts WHERE email = LOWER($1)",
      [email_address]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "There is no account associated with the provided email." });
    }

    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
    if (passwordMatch) {
      const token = jwt.sign({ userId: user.rows[0].user_id  }, process.env.JWT_SECRET, { expiresIn: '6h' });
      res.status(200).json({ message: "Log in successful.", token: token });
      return token;
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({message:"Internal Server Error"});
  }
});

// Helper function to extract username and tag_line
function extractUsernameAndTagline(fullUsername) {
  const hashIndex = fullUsername.indexOf("#");

  if (hashIndex !== -1) {
    const originalUsername = fullUsername.substring(0, hashIndex);
    const tag_line = fullUsername.substring(hashIndex + 1);
    return [originalUsername, tag_line];
  } else {
    // If no tag_line is found, throw an error or return a value to indicate that it's required
    throw new Error("Tagline is required for usernames with a '#'.");
  }
}

// server port logic
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});

// <----- Everything past this point, requires riot's api and is mainly used for testing ----->

app.get("/riot_api/player_search'", async (req, res) => {
  const {gameName, tagLine, region} = req.body;
  try {
    const riotResponse = await axios.get(`https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${RIOT_API}`)
    res.json(riotResponse.data);
  res.status(200).json({ message: '' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
}
});
