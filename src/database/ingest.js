import http from "http";
import xml2js from "xml2js";
import {executeIngest, dropCollection} from './utils.js';
const parser = new xml2js.Parser({ attrkey: "ATTR" });

const xmlUrl = "http://fx-nunchee-assets.s3.amazonaws.com/data/sports.xml";

dropCollection('teams');
dropCollection('players');

http.get(xmlUrl, (res) => {
    res.setEncoding("utf8");
    let data = '';
    let teamObj;
    let playerObj;

    res.on('data', (stream) => {
        data += stream;
    });
    res.on('end', () => {
        parser.parseString(data, async (error, result) => {
            if (error === null) {
                result['plantelEquipo']['equipo'].map((team) => {
                    teamObj = team['ATTR'];
                    console.log(`Insert Team ${team['ATTR']['nombre']}`)
                    executeIngest('teams', teamObj);

                    team['jugadores'][0]['jugador'].map((player) => {                      
                        
                        playerObj = {
                            id: player['ATTR']['id'],
                            teamId: team['ATTR']['id'],
                            nombre: player['nombre'][0],
                            apellido: player['apellido'][0],
                            nombreCorto: player['nombreCorto'][0],
                            ladoHabil: player['ladoHabil'][0],
                            fechaNacimiento: player['fechaNacimiento'][0],
                            horaNacimiento: player['horaNacimiento'][0],
                            edad: player['edad'][0],
                            peso: player['peso'][0],
                            altura: player['altura'][0],
                            apodo: player['apodo'][0],
                            rol: player['rol'][0]['_'],
                            camiseta: player['camiseta'][0],
                            pais: player['pais'][0]['_'],
                            provincia: player['provincia'][0],
                            clubActual: player['clubActual'][0]['ATTR']['id'],
                            localidad: player['localidad'][0],
                            activo: true

                        }
                        console.log(`Insert Active Player ${player['nombre'][0] ? player['nombre'][0] : ''}`)
                        executeIngest('players', playerObj);
                    }); 

                    if (team['jugadoresDadosBaja'][0]['jugador']){    
                        team['jugadoresDadosBaja'][0]['jugador'].map((player) => {                      
  
                            playerObj = {
                                id: player['ATTR']['id'],
                                teamId: team['ATTR']['id'],
                                nombre: player['nombre'][0],
                                apellido: player['apellido'][0],
                                nombreCorto: player['nombreCorto'][0],
                                fechaBaja: player['fechaBaja'][0],
                                ladoHabil: player['ladoHabil'][0],
                                fechaNacimiento: player['fechaNacimiento'][0],
                                horaNacimiento: player['horaNacimiento'][0],
                                peso: player['peso'][0],
                                altura: player['altura'][0],
                                apodo: player['apodo'][0],
                                rol: player['rol'][0]['_'],
                                camiseta: player['camiseta'][0],
                                pais: player['pais'][0]['_'],
                                provincia: player['provincia'][0],
                                clubActual: player['clubActual'][0]['ATTR']['id'],
                                localidad: player['localidad'][0],
                                activo: false

                            }
                            console.log(`Insert Inactive Player ${player['nombre'][0] ? player['nombre'][0] : ''}`)
                            executeIngest('players', playerObj);
                        }); 
                    }
                });



                   
            }
            else {
                console.log(error);
            }
        });
    });
});



