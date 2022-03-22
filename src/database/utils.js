import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
config();



export async function connectToCluster(uri) {
    let mongoClient;
 
    try {
        mongoClient = new MongoClient(uri);
        await mongoClient.connect();
 
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB failed!', error);
        process.exit();
    }
}

 export async function executeIngest(collectionName, document) {
    const uri = process.env.DB_URI;
    const dbname = process.env.DB_NAME;
    let mongoClient;
    
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db(dbname);
        const collection = db.collection(collectionName);
 
        await createDocument(collection, document);
    } 
    catch (e){
        console.log(e)
    }
    finally {
        await mongoClient.close();
    }
 }

export async function createDocument(collection, document) {
    await collection.insertOne(document);
}

export async function find(collection, name) {
    return collection.find(name).toArray();
}

 
export async function executeFindAll(collectionName) {
    const uri = process.env.DB_URI;
    const dbname = process.env.DB_NAME;
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db(dbname);
        const collection = db.collection(collectionName);
        return await find(collection, {});
    } finally {
        await mongoClient.close();
    }
}

export async function executeFindPlayerByTeamId(teamId) {
    const uri = process.env.DB_URI;
    const dbname = process.env.DB_NAME;
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db(dbname);
        const collection = db.collection('players');
        return await find(collection, {"teamId": teamId});
    } finally {
        await mongoClient.close();
    }
}


export async function executeFindPlayerByPosition(position) {
    const uri = process.env.DB_URI;
    const dbname = process.env.DB_NAME;
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db(dbname);
        const collection = db.collection('players');
        return await find(collection, {"rol": position});
    } finally {
        await mongoClient.close();
    }
}

export async function dropCollection(collectionName) {
    const uri = process.env.DB_URI;
    const dbname = process.env.DB_NAME;
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db(dbname);
        const collection = db.collection(collectionName);
        await collection.drop();
    }
    catch(e){
        console.log(e)
    }
    finally {
        await mongoClient.close();
    }
}
