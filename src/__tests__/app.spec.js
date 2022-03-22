import app from '../app.js';
import supertest from 'supertest';

describe("GET / when access to API", () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(app).get("/")
    expect(response.statusCode).toBe(200)
  })
  test('should specify json in the content type header', async () => {
    const response = await supertest(app).get("/")
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
  }) 
  test('response should has msg', async () => {
    const response = await supertest(app).get("/")
    expect(response.body.msg).toBeDefined()
  }) 
})

describe("GET /api/team - list all available teams", () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(app).get("/api/team")
    expect(response.statusCode).toBe(200)
  })
  test('should specify json in the content type header', async () => {
    const response = await supertest(app).get("/api/team")
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
  }) 
  test('on each element of array object should be defined specific fields', async () => {
    const response = await supertest(app).get("/api/team")
    const fields = ['id', 'nombre', 'sigla', 'paisId', 'paisNombre', 'tipo'];

    response.body.map( (element) => {
      fields.map((field) => {
        expect(element[field]).toBeDefined();
      })
    })  
  }) 
})


describe("GET /api/teams/:idTeam/players - list all players for team id", () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(app).get("/api/teams/143/players")
    expect(response.statusCode).toBe(200)
  })
  
  test('should respond with a 400 status code when bad request', async () => {
    const response = await supertest(app).get("/api/teams/test/players")
    expect(response.statusCode).toBe(400)
  })

  test('should specify json in the content type header', async () => {
    const response = await supertest(app).get("/api/teams/143/players")
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
  }) 
 
  test('on each element of array obj should be defined specific fields', async () => {
    const response = await supertest(app).get("/api/teams/143/players")
    const fields = [
      'id', 
      'teamId', 
      'nombre', 
      'apellido', 
      'nombreCorto', 
      'ladoHabil', 
      'fechaNacimiento',
      'horaNacimiento',
      'peso',
      'altura',
      'apodo',
      'rol',
      'camiseta',
      'pais',
      'provincia',
      'clubActual',
      'localidad',
      'activo'
    ];

    response.body.map( (element) => {
      fields.map((field) => {
        expect(element[field]).toBeDefined();
      })
    })  
  }) 
  
})



describe("GET /api/teams/players/:position - list all players for a position", () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(app).get("/api/teams/players/delantero")
    expect(response.statusCode).toBe(200)
  })
  
  test('should respond with a 400 status code when bad request', async () => {
    const response = await supertest(app).get("/api/teams/players/test")
    expect(response.statusCode).toBe(400)
  })

  test('should specify json in the content type header', async () => {
    const response = await supertest(app).get("/api/teams/players/delantero")
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
  }) 
 
  test('on each element of array obj should be defined specific fields', async () => {
    const response = await supertest(app).get("/api/teams/players/delantero")
    const fields = [
      'id', 
      'teamId', 
      'nombre', 
      'apellido', 
      'nombreCorto', 
      'ladoHabil', 
      'fechaNacimiento',
      'horaNacimiento',
      'peso',
      'altura',
      'apodo',
      'rol',
      'camiseta',
      'pais',
      'provincia',
      'clubActual',
      'localidad',
      'activo'
    ];

    response.body.map( (element) => {
      fields.map((field) => {
        expect(element[field]).toBeDefined();
      })
    })  
  }) 
  
})
