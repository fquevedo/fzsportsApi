import express from "express";
import {executeFindAll, executeFindPlayerByTeamId, executeFindPlayerByPosition} from './database/utils.js'

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({"msg": "Hola FzSports!"});
})

// all teams
app.get('/api/team', async (req, res) => {
    const collection = await executeFindAll('Teams');

    res.json(collection);
})
// get players of a team id
app.get('/api/teams/:idTeam/players', async (req, res) => {
    const idTeam = req.params.idTeam;
    const playerCollection = await executeFindPlayerByTeamId(idTeam);

    res.json(playerCollection);
})
// get players for specific rol
app.get('/api/teams/players/:position', async (req, res) => {
    let position = req.params.position;
    position = position.charAt(0).toUpperCase() + position.slice(1);
    const playerCollection = await executeFindPlayerByPosition(position);

    res.json(playerCollection);
})

export default app;