import { Mongooz } from './mongooz';

let dbUrl: string = "mongodb://localhost:27017/";
let mongooz: Mongooz = new Mongooz(dbUrl);

async function main() {
    console.log(await mongooz.read({name: {$eq: "Mariam Kinsman"}},{db: "data", collection: "person"}));
}
main().catch(err => console.error(err));