/**
 * Mongooz
 * A simple js library that fascilitates CRUD operations with MongoDB
 * Purely asynchronous
 * @author Edicha Joshua (for Aptsoft)
 */

import {   
    FilterQuery,
    DeleteWriteOpResultObject,
    UpdateWriteOpResult,
    UpdateQuery,
    InsertWriteOpResult,
    MongoError,
    Cursor
        } from "mongodb";

import { DbCollectionLookupI } from './interfaces';
import { MongoozConnection } from './connection';
import {
    Inserter,
    Finder,
    Updater,
    Deleter
} from './crud';
/**
 * Mongooz
 * @description wrapper class
 */
export class Mongooz {
    private _url: string;
    private _connection!: MongoozConnection;
    private _dbName!: string;
    private _collectionName!: string;
    private _lastRead!: Cursor<any>; // cache last result locally

    constructor(url?: string) {
        this._url = <string>url;
    }

    async insertMany(documents: any, lookUpOptions?: DbCollectionLookupI): Promise<InsertWriteOpResult<any>> {
        this.updateAndValidateLookupOptions(lookUpOptions);
        await this.ensureConnectionIsEstablishedAndOpen();

        try {
            await this._connection.use({db: this._dbName, collection: this._collectionName});
            let response = await Inserter.insertMany(this._connection.collection(),documents);
            return response;
        } catch(err) {
            throw <MongoError>err;
        }

    }

    async findAll(query: FilterQuery<any>, lookUpOptions?: DbCollectionLookupI): Promise<Cursor<any>> {
        this.updateAndValidateLookupOptions(lookUpOptions);
        await this.ensureConnectionIsEstablishedAndOpen();

        try {
            await this._connection.use({db: this._dbName, collection: this._collectionName});
            this._lastRead = await (await Finder.findAll(this._connection.collection(),query));

            return this._lastRead;
        } catch(err) {
            throw <MongoError>err;
        }

    }

    async updateMany(filter: FilterQuery<any>, updateQuery: UpdateQuery<any>, lookUpOptions?: DbCollectionLookupI): Promise<UpdateWriteOpResult> {
        this.updateAndValidateLookupOptions(lookUpOptions);
        await this.ensureConnectionIsEstablishedAndOpen();

        try {
            await this._connection.use({db: this._dbName, collection: this._collectionName});
            return await Updater.updateMany(this._connection.collection(),filter,updateQuery);
        } catch(err) {
            throw <MongoError>err;
        }
    }

    async deleteMany(filter: FilterQuery<any>, lookUpOptions?: DbCollectionLookupI): Promise<DeleteWriteOpResultObject> {
        await this.updateAndValidateLookupOptions(lookUpOptions);
        await this.ensureConnectionIsEstablishedAndOpen();

        try {
            await this._connection.use({db: this._dbName, collection: this._collectionName});
            return await Deleter.deleteMany(this._connection.collection(),filter);
        } catch(err) {
            throw <MongoError>err;
        }
    }

    async openConnection() {
        
        try {
            if(!this._connection || this._connection.notInitialized() || await this._connection.isClosed()) {
                this._connection = new MongoozConnection();
                await this._connection.open(this._url); 
            }    
        } catch(err) {
            throw err;
        }     
    }

    async closeConnection() {
        if(this._connection.isOpen()) {
            await this._connection.close();
            this._connection = new MongoozConnection();
        }
    }

    private updateAndValidateLookupOptions(lookUpOptions?: DbCollectionLookupI) {
        if(lookUpOptions) {
            this._dbName = lookUpOptions.db || this._dbName;
            this._collectionName = lookUpOptions.collection || this._collectionName;
        }

        if(!this._dbName || !this._collectionName) {
            throw (new Error("lookUpOptions can only be omitted if there is already cached values for it"));
        }        
    }

    private async ensureConnectionIsEstablishedAndOpen() {
        if(this._connection.notInitialized() || await this._connection.isClosed()) {
            throw (new Error("ensure connection is open before performing any operation"));
        }
    }
}