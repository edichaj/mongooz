import {    
    MongoClient,
    MongoNetworkError,
    Collection,
    Db
} from "mongodb";

import { DbCollectionLookupI } from './interfaces';

/**
 * @class MongoozConnection
 * @description holds connection to the db
 */
export class MongoozConnection {
    private _connection!: MongoClient | any;
    private _db!: Db;
    private _collection!: Collection;
    constructor() {}

    async open(url: string): Promise<void> {
        this._connection = await MongoClient.connect(<string>url,{useUnifiedTopology: true}).catch((err: MongoNetworkError) => console.error(err));
        return this._connection;
    }

    async isClosed(): Promise<boolean> {
        return !(await this._connection.isConnected());
    }

    async isOpen(): Promise<boolean> {
        return await this._connection.isConnected();
    }

    notInitialized(): boolean {
        return !this._connection;
    }

    async close(): Promise<void> {
        await this._connection.close();
    }

    async use(lookUpOptions: DbCollectionLookupI): Promise<{db: Db, collection: Collection}> {
        this._db = this._db || await this._connection.db(<string>lookUpOptions.db);
        this._collection = this._collection || await this._db.collection(<string>lookUpOptions.collection);
        return {db: this._db, collection: this._collection};
    } 

    private getConnectionInstance(): MongoClient {
        return <MongoClient>this._connection;
    }

    db() {
        return this._db;
    }

    collection() {
        return this._collection;
    }
}
