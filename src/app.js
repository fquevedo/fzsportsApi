import express from "express";
import {executeFindAll, executeFindPlayerByTeamId, executeFindPlayerByPosition} from './database/utils.js'

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({"msg": "Hola FzSports!"});
})

// all teams
app.get('/api/team', async (req, res) => {
    const collection = await executeFindAll('teams');

    res.json(collection);
})
// get players of a team id
app.get('/api/teams/:idTeam/players', async (req, res) => {
    const idTeam = req.params.idTeam;
    if (isNaN(idTeam)){
        res.sendStatus(400);
    }
    else {
        const playerCollection = await executeFindPlayerByTeamId(idTeam);
        res.json(playerCollection);
    }
        


})
// get players for specific rols
app.get('/api/teams/players/:position', async (req, res) => {
    let position = req.params.position;
    position = position.charAt(0).toUpperCase() + position.slice(1);
    
    if (!['Arquero', 'Volante', 'Delantero', 'Defensa'].includes(position))
        res.sendStatus(400);
    else {
        
        const playerCollection = await executeFindPlayerByPosition(position);
        res.json(playerCollection);
    }

})

export default app;