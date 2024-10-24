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
    const { gameName, tagLine, server_name} = req.body
    console.log(gameName, tagLine, server_name);
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({ message: "Invalid user ID" });
    }

    const regionSearch = await pool.query(
      "SELECT region FROM server WHERE server_name = ($1)",
      [server_name]
    );
    const region = regionSearch.rows[0].region
    console.log(region)
    console.log(region, gameName, tagLine, RIOT_API);
    const playerSearch = await axios.get(
      `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${RIOT_API}`
    );
    console.log("api call successful");
    const puuid = playerSearch.data.puuid;
    
    const searchPlayer = await pool.query(
      "SELECT * FROM player WHERE puuid = ($1)",
      [puuid]
    );

    let player_id;

    if (searchPlayer.rows.length === 0) {
      // Player not found in the database, insert the record
      const saveUser = await pool.query(
        "INSERT INTO player (puuid, server_name) VALUES ($1, $2) RETURNING player_id",
        [puuid, server_name]
      );
      player_id = saveUser.rows[0].player_id;
    } else {
      // Player found in the database, get the player_id
      player_id = searchPlayer.rows[0].player_id;
    
      // Update the server in the database
      const updatePlayer = await pool.query(
        "UPDATE player SET server_name = $1 WHERE puuid = $2",
        [server_name, puuid]
      );
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

    let rating; 

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
  const userId = req.user.userId;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized request. Please log in before performing this action." });
  }

  try {
    const reviewSearch = await pool.query("SELECT * FROM ratings WHERE user_id = ($1) ORDER BY rating_id ASC", [userId]);

    const playerIds = reviewSearch.rows.map((review) => review.player_id).sort((a, b) => a - b);
    console.log('playerIds: '+playerIds);
    const usernameSearch = await pool.query("SELECT username FROM user_accounts WHERE user_id = $1", [userId]);
    if (playerIds.length === 0) {
      const responseData = {
        reviewSearch: reviewSearch.rows,
        playerNames: [],
        usernameSearch: usernameSearch.rows[0],
      };

      return res.json(responseData);
    }

    const puuidCollection = await pool.query(
      "SELECT puuid FROM player WHERE player_id = ANY($1)",
      [playerIds]
    );

    // Extracting the server name from the collection
    const puuid = puuidCollection.rows[0].puuid;

    const serverCollection = await pool.query(
      "SELECT server_name FROM player WHERE puuid = ($1)",
      [puuid]
    );

    // Extracting the server name from the collection
    const serverName = serverCollection.rows[0].server_name;

    const regionCollection = await pool.query(
      "SELECT region FROM server WHERE server_name = ($1)",
      [serverName]
    );

    // Extracting the region from the collection
    const region = regionCollection.rows[0].region;
    
    const playerNamesPromises = [];

    console.log("pre api call")
    for (const { puuid } of puuidCollection.rows) {
      try {
        console.log("entered")
        // Push the promise to fetch the Riot API data into playerNamesPromises
        playerNamesPromises.push(
          axios.get(`https://${region}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}?api_key=${RIOT_API}`)
        );
        await sleep(100);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error collecting account names from Riot API" });
      }
    }

    const playerNamesResponse = await Promise.all(playerNamesPromises);

    // Map puuids to gameNames
    const playerNames = playerNamesResponse.map((response) => response.data.gameName).reverse();
    const responseData = {
      reviewSearch: reviewSearch.rows,
      playerNames,
      usernameSearch: usernameSearch.rows[0],
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Unauthorized request. " });
  }
});
// !!---------- After this line, jwt is not needed ----------!!

// player search
app.get("/search", async (req, res) => {

  console.log("search route hit")
  const { gameName, tagLine, server_name } = req.query;
  try {
    const regionSearch = await pool.query(
      "SELECT region FROM server WHERE server_name = ($1)",
      [server_name]
    );

    const region = regionSearch.rows[0].region;

    const playerSearch = await axios.get(`https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${RIOT_API}`);

    const player_data = 
    {
      server_name : server_name,
      puuid : playerSearch.data.puuid,
      gameName : playerSearch.data.gameName,
      tagLine : playerSearch.data.tagLine
    };

    res.json(player_data);

  } catch (error) {
    res.status(404).json("Player not found. Please check the spelling of the name and tag line");
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
    const { puuid } = req.body;

    // Locate player id
    const playerResult = await pool.query(
      "SELECT player_id FROM player WHERE puuid = ($1)",
      [puuid]
    );

    const player_id = playerResult.rows[0]?.player_id;

    if (!player_id){
      res.status(404).send('No ratings found');
      return;
    }

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

    if (existingEntry.rows.length === 0) {
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
    const { puuid } = req.query;

    const player_id_result = await pool.query(
      "SELECT player_id FROM player WHERE puuid = ($1)",
      [puuid]
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
    const { puuid } = req.query;

    const reviews = await pool.query(
      "SELECT * FROM ratings WHERE player_id = (SELECT player_id FROM player WHERE puuid = ($1))",
      [puuid]
    );

    const usernames = await pool.query(
      "SELECT username FROM user_accounts " +
      "JOIN ratings ON user_accounts.user_id = ratings.user_id " +
      "JOIN player ON ratings.player_id = player.player_id " +
      "WHERE player.puuid = ($1)",
      [puuid]
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
      const token = jwt.sign({ userId: user.rows[0].user_id  }, process.env.JWT_SECRET, { expiresIn: '12h' });
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

// loads user profile data
app.get("/riot_api/player_profile", async (req, res) => {
  
  const { puuid, server_name } = req.query;
  
  console.log(server_name)
  try {
    const serverTagCollection = await pool.query(
      "SELECT server_tag FROM server WHERE server_name = ($1)",
      [server_name]
    );
    const server_tag = serverTagCollection.rows[0].server_tag;

    const playerIdSearch = await axios.get(`https://${server_tag}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${RIOT_API}`);
    const playerId = playerIdSearch.data.id;

    const player_level = playerIdSearch.data.summonerLevel;
    const player_icon = playerIdSearch.data.profileIconId;
    const playerProfileData = {player_level, player_icon};

    const playerRankedData = await axios.get(`https://${server_tag}.api.riotgames.com/lol/league/v4/entries/by-summoner/${playerId}?api_key=${RIOT_API}`);

    const soloQ = playerRankedData.data.findIndex(entry => entry.queueType === "RANKED_SOLO_5x5");
    const flexQ = playerRankedData.data.findIndex(entry => entry.queueType === "RANKED_FLEX_SR");

    if(soloQ<0 && flexQ<0){
      return res.json(playerProfileData);
      
    }else if(soloQ<0 && flexQ>=0){
      const rankedFQ = rankedDataFQ(playerRankedData, flexQ);
      return res.json({rankedFQ, playerProfileData});
    }else if(soloQ>=0 && flexQ<0){
      const rankedSQ = rankedDataSQ(playerRankedData, soloQ);
      return res.json({rankedSQ, playerProfileData});
    }else{
      const rankedFQ = rankedDataFQ(playerRankedData, flexQ);
      const rankedSQ = rankedDataSQ(playerRankedData, soloQ);
      res.json({rankedSQ, rankedFQ, playerProfileData});
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

function rankedDataSQ (playerRankedData, soloQ){
  const player_Rank_SQ = playerRankedData.data[soloQ].rank; 
  const queue_Type_SQ = playerRankedData.data[soloQ].queueType;
  const player_Tier_SQ = playerRankedData.data[soloQ].tier;
  const player_LP_SQ = playerRankedData.data[soloQ].leaguePoints;
  const player_Ranked_Wins_SQ = playerRankedData.data[soloQ].wins;
  const player_Ranked_Losses_SQ = playerRankedData.data[soloQ].losses;
  const calculated_Player_WR_SQ = ((player_Ranked_Wins_SQ / (player_Ranked_Wins_SQ + player_Ranked_Losses_SQ)) * 100).toFixed(1);

  const rankedSQ = {player_Rank_SQ, queue_Type_SQ, player_Tier_SQ, player_LP_SQ, player_Ranked_Wins_SQ, player_Ranked_Losses_SQ, calculated_Player_WR_SQ};

  return (rankedSQ);
}

function rankedDataFQ(playerRankedData, flexQ){
  const player_Rank_FQ = playerRankedData.data[flexQ].rank; 
  const queue_Type_FQ = playerRankedData.data[flexQ].queueType;
  const player_Tier_FQ = playerRankedData.data[flexQ].tier;
  const player_LP_FQ = playerRankedData.data[flexQ].leaguePoints;
  const player_Ranked_Wins_FQ = playerRankedData.data[flexQ].wins;
  const player_Ranked_Losses_FQ = playerRankedData.data[flexQ].losses;
  const calculated_Player_WR_FQ = ((player_Ranked_Wins_FQ / (player_Ranked_Wins_FQ + player_Ranked_Losses_FQ)) * 100).toFixed(1);
  
  const rankedFQ = {player_Rank_FQ, queue_Type_FQ, player_Tier_FQ, player_LP_FQ, player_Ranked_Wins_FQ, player_Ranked_Losses_FQ, calculated_Player_WR_FQ};

  return (rankedFQ);
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// collects 20 games of match history and responds with relevant data in the form of an object called - matchData
app.get("/riot_api/match_history", async (req, res) => {

  const { puuid, server_name, matchList } = req.query;

  try {
    const regionCollection = await pool.query(
      "SELECT region FROM server WHERE server_name = ($1)",
      [server_name]
    );

    const region = regionCollection.rows[0].region;
    console.log('puuid: '+puuid);
    // collects recent 20 game match history
    const gamesResponse = await axios.get(`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${matchList}&count=20&api_key=${RIOT_API}`);
    
    // console.log(gamesResponse);
    // set's local gameIds to the data received from gamesResponse (array of game ids)
    const gameIds = gamesResponse.data;
    console.log('game response: '+gamesResponse.data);
    // array to store promises for match data
    const matchDataPromises = [];
    // loops through the array of gameIds
    for (const gameId of gameIds) {

      matchDataPromises.push(
        axios.get(`https://${region}.api.riotgames.com/lol/match/v5/matches/${gameId}?api_key=${RIOT_API}`)
      );

      const ere = axios.get(`https://${region}.api.riotgames.com/lol/match/v5/matches/${gameId}?api_key=${RIOT_API}`);
      console.log('ere: '+ere);
      await sleep(100);
    }
  
    // use Promise.all to wait for all API calls to complete
    const gameStatsResponses = await Promise.all(matchDataPromises);
    console.log("gameStatsResponses: " + gameStatsResponses);
    // array to store match data for each game
    const matchDataArray = [];

    // process each API response
    for (const gameStats of gameStatsResponses) {
  
      const index_puuid = gameStats.data.metadata.participants.indexOf(puuid);

      const player_data = gameStats.data.info.participants[index_puuid];

      const kda = (player_data.kills+'/'+player_data.deaths+'/'+player_data.assists);
      const calculated_kda = ((player_data.kills + player_data.assists) / player_data.deaths).toFixed(2);
      const champion_played = player_data.championName;
      const minion_kills = player_data.totalMinionsKilled;
      const summoner_spells = [player_data.summoner1Id, player_data.summoner2Id];
      const game_mode = gameStats.data.info.gameMode;
      const game_time = secondsToMinutesAndSeconds(gameStats.data.info.gameDuration);
      const minions_pm = (minion_kills/(gameStats.data.info.gameDuration/60)).toFixed(1);
      const items = [player_data.item0, player_data.item1, player_data.item2, player_data.item3, player_data.item4, player_data.item5, player_data.item6 ]
      const pings = [player_data.allInPings, player_data.assistMePings, player_data.basicPings, player_data.commandPings, player_data.dangerPings, player_data.enemyMissingPings, player_data.enemyVisionPings, player_data.getBackPings, player_data.holdPings, player_data.needVisionPings, player_data.onMyWayPings, player_data.pushPings, player_data.visionClearedPings]
      const total_pings = pings.reduce((total, ping) => total + ping, 0); // fix

      const win_verdict = player_data.win;

      const maxPingIndex = pings.indexOf(Math.max(...pings));

      const pingTypes = [
        'All In',
        'Assist Me',
        'Basic',
        'Command',
        'Danger',
        'Enemy Missing',
        'Enemy Vision',
        'Get Back',
        'Hold',
        'NeedVision',
        'On My Way',
        'Push',
        'VisionCleared'
      ];
      
      const most_used_ping = pingTypes[maxPingIndex];

      // kill participation calculation
      const player_team_Id = gameStats.data.info.participants.filter(player => player.teamId === player_data.teamId);
      const player_team_kills = player_team_Id.reduce((total, player) => total + player.kills, 0);
      const kill_participation = (((player_data.kills + player_data.assists) / player_team_kills) * 100).toFixed(0); // fix

      const participants = [player_data.riotIdName]; // fix

      const matchData = {
        kda: kda, // int - K/D/A (ex. 7/2/12)
        champion_played: champion_played, // string - character name (ex. Gangplank)
        minion_kills: minion_kills, // int - total minions killed (ex. 300)
        summoner_spells: summoner_spells, // array - summoner spells (ex. [1,4])
        game_mode: game_mode, // string - game mode (ex. NORMAL 5v5)
        game_time: game_time, // time - game time in minutes and seconds(ex. 29:12)
        minions_pm: minions_pm, // int - minions killed per minute (ex. 9.2)
        participants: participants, // UNSURE IF WORKING. MUST CHECK BACK AGAIN LATER. array - player names in match (ex. ?)
        kill_participation: kill_participation, // int - kill participation percentage (ex. 76%)
        calculated_kda: calculated_kda, // int - (K+A)/D to 2 decimal places (ex. 7.00)
        items: items, // array - item numbers (ex. [35, 8, 19, ...])
        most_used_ping: most_used_ping,
        total_pings: total_pings, // int - total sum of pings (ex. 82)
        win_verdict: win_verdict // bool - win(true) or loss(false)
      };

      matchDataArray.push(matchData);
      
    }

    // Send the array of match data once after the loop is completed
    // console.log(matchDataArray)
    console.log("match_history completed successfully!")
    res.json(matchDataArray);

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// app.get("/riot_api/match_history_extended", async (req, res) => {
//   const { match_id, region } = req.query;
//   try {
//     const playerSearch = await axios.get(`https://${region}.api.riotgames.com/lol/match/v5/matches/${match_id}?api_key=${RIOT_API}`);
//     const matchDataExtended = playerSearch.data
//   } catch (error){
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

function secondsToMinutesAndSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}