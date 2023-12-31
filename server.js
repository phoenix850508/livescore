// const jsonServer = require("json-server");
// const server = jsonServer.create();
// const router = jsonServer.router("./db.json");
// const middlewares = jsonServer.defaults({ static: "./build" });
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

// the following code allows me to use json-server data after deployment
// json-server code starts
// server.use(middlewares);
// server.use(
//   jsonServer.rewriter({
//     "/api/*": "/$1",
//     "/date/:date": "/date?date=:date",
//     "/live/:live": "/live?live=:live",
//     "/season/:season/team/:team": "/season?season=:season.team.team=:team",
//     "/game/:id": "/game?id=:id",
//     "/teams/:conference": "/teams?conference=:conference",
//     "/standing/:league/:season/:conference":
//       "/standing?league=:league/season=:season/conference=:conference",
//     "/stats/:id": "/stats?id=:id",
//     "/team/:id": "/team?id=:id",
//   })
// );
// server.use(router);
// server.listen(port, () => {
//   console.log("Server is running");
// });
// json-server code ends
const base_url = "https://api-nba-v1.p.rapidapi.com";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(cors());

const headers = {
  "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
};

// get nba matches per date
app.get("/api/date/:date", async (req, res) => {
  const options = {
    method: "GET",
    url: `${base_url}/games?date=${req.params.date}`,
    headers,
  };
  try {
    const response = await axios.request(options);
    res.json(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
});

// get nba teams
app.get("/api/teams/:id", async (req, res) => {
  const options = {
    method: "GET",
    url: `${base_url}/teams?id=${req.params.id}`,
    headers,
  };
  if (req.params.id === "all") {
    options.url = `${base_url}/teams`;
  }
  try {
    const response = await axios.request(options);
    res.json(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
});

// get nba match stats
app.get("/api/stats/:id", async (req, res) => {
  const options = {
    method: "GET",
    url: `${base_url}/games/statistics?id=${req.params.id}`,
    headers,
  };
  try {
    const response = await axios.request(options);
    res.json(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
});

// get nba match info
app.get("/api/game/:id", async (req, res) => {
  const options = {
    method: "GET",
    url: `${base_url}/games?id=${req.params.id}`,
    headers,
  };
  try {
    const response = await axios.request(options);
    res.json(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
});

// get nba league standing
app.get("/api/standing/:league/:season/:conference", async (req, res) => {
  const options = {
    method: "GET",
    url: `${base_url}/standings?league=${req.params.league}&season=${req.params.season}&conference=${req.params.conference}`,
    headers,
  };
  try {
    const response = await axios.request(options);
    res.json(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
});

// get nba team all season games
app.get("/api/gamesPerTeamAndSeason/:season/:teamId", async (req, res) => {
  const options = {
    method: "GET",
    url: `${base_url}/games?season=${req.params.season}&team=${req.params.teamId}`,
    headers,
  };
  try {
    const response = await axios.request(options);
    res.json(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
});

// get mlb line scores
app.get("/mlb/linescore/:gameID", async (req, res) => {
  const options = {
    method: "GET",
    url: `${base_url}/getMLBLineScore?gameID=${req.params.gameID}`,
    headers,
  };
  try {
    const response = await axios.request(options);
    res.json(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
