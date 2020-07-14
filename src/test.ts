import { Mongooz } from './mongooz';
import { DeleteWriteOpResultObject, InsertWriteOpResult } from 'mongodb';

let dbUrl: string = "mongodb://localhost:27017/";
let mongooz: Mongooz = new Mongooz(dbUrl);

async function main() {
    await mongooz.openConnection();
    console.log(await <DeleteWriteOpResultObject>(await mongooz.deleteMany({name: "Philip Ralp"},{db: "data", collection: "person"})).result);
    await mongooz.closeConnection();
}
main();
