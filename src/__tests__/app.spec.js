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
  test('on each element of array obj should be defined: id, nombre, sigla, paisId, paisNombre, tipo', async () => {
    const response = await supertest(app).get("/api/team")
    const fields = ['id', 'nombre', 'sigla', 'paisId', 'paisNombre', 'tipo'];

    response.body.map( (element) => {
      fields.map((field) => {
        expect(element[field]).toBeDefined();
      })
    })  
  }) 
})

/*
describe("GET /api/teams/:idTeam/players - list all players from idTeam", () => {
  test('should respond with a 200 status code if team Id its number', async () => {
    const response = await supertest(app).get("/api/team/1/players")
    expect(response.statusCode).toBe(200)
  })
  test('should respond with a 400 status code if team Id its not a number value', async () => {
    const response = await supertest(app).get("/api/team/xxx/players")
    expect(response.statusCode).toBe(400)
  })
  test('should specify json in the content type header', async () => {
    const response = await supertest(app).get("/api/team")
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
  }) 
  test('on each element of array obj should be defined: id, nombre, sigla, paisId, paisNombre, tipo', async () => {
    const response = await supertest(app).get("/api/team")
    const fields = ['id', 'nombre', 'sigla', 'paisId', 'paisNombre', 'tipo'];

    response.body.map( (element) => {
      fields.map((field) => {
        expect(element[field]).toBeDefined();
      })
    })  
  }) 
})
*/