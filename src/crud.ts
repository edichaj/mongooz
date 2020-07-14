import { 
    Collection,
    FilterQuery,
    DeleteWriteOpResultObject,
    UpdateWriteOpResult,
    UpdateQuery,
    InsertWriteOpResult,
    Cursor
        } from "mongodb";

/**
 * @class MongoozCreator
 * @description responsible for all (C)reate operations
 */
export class Inserter {
    static async insertMany(collection: Collection, documents: any): Promise<InsertWriteOpResult<any>> {
        return await collection.insertMany(documents);
    }
}

/**
 * @class MongoozReader
 * @description responsible for all (R)ead operations
 */
export class Finder {
    static async findAll(collection: Collection, query: FilterQuery<any>): Promise<Cursor<any>> {
        return await (await collection.find(query));
    }
}

/**
 * @class MongoozUpdater
 * @description responsible for all (U)pdate operations
 */
export class Updater {
    static async updateMany(collection: Collection, filter: FilterQuery<any>, updateQuery: UpdateQuery<any>): Promise<UpdateWriteOpResult> {
        return await collection.updateMany(filter, updateQuery);
    }
}

/**
 * @class MongoozDeleter
 * @description responsible for all (D)elete operations
 */
export class Deleter {
    static async deleteMany(collection: Collection, filter: FilterQuery<any>): Promise<DeleteWriteOpResultObject> {
        return await collection.deleteMany(filter);
    }
}

