/**
 * Mongooz
 * A simple js library that fascilitates CRUD operations with MongoDB
 * Purely asynchronous
 * @author Edicha Joshua (for Aptsoft)
 */

import {    
    MongoClient,
    MongoNetworkError,
    Cursor, 
    Collection,
    FilterQuery,
    Db
        } from "mongodb";

import { DbCollectionLookupI } from './interfaces';

/**
 * Mongooz
 * @description wrapper class
 */
export class Mongooz {
    private _url?: string;
    private _connection: Connection = new Connection();
    private _lastResponse!: any[]; // cache last result locally

    constructor(url?: string) {
        this._url = url;
    }

    async read(query: FilterQuery<any>, lookUpOptions: DbCollectionLookupI): Promise<any[]> {
        await this._connection.establish(this._url);
        await this._connection.useDB(lookUpOptions.db);
        await this._connection.useCollection(<string>lookUpOptions.collection);
        this._lastResponse = await (await Reader.read(this._connection.collection(),query));
        await this._connection.kill();
        return await this._lastResponse;
    }

    lastResponse() {
        return this._lastResponse;
    }
}

/**
 * @class Connection
 * @description holds connection to the db
 */
export class Connection {
    private _connection!: MongoClient | any;
    private _db!: Db;
    private _collection!: Collection;
    constructor() {}

    async establish(url ?: string): Promise<void> {
        this._connection = await MongoClient.connect(<string>url,{useUnifiedTopology: true}).catch((err: MongoNetworkError) => console.error(err));
    }

    async kill(): Promise<void> {
        this.connection().close();
    }

    async useDB(dbName?: string): Promise<Db> {
        this._db = this._db || await this._connection.db(dbName);
        return this._db;
    }

    async useCollection(collectionName: string): Promise<Collection> {
        this._collection = this._collection || await this._db.collection(collectionName);
        return this._collection;
    } 

    connection(): MongoClient {
        return this._connection;
    }

    db() {
        return this._db;
    }

    collection() {
        return this._collection;
    }
}

/**
 * @class Reader
 */
class Reader {
    static async read(collection: Collection, query: FilterQuery<any>): Promise<any[]> {
        return await (await collection.find(query)).toArray();
    }
}