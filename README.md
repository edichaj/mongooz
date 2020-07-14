# Mongooz
### Mongooz makes `mongodb` CRUD operations easier and shorter.

> current version: 0.0.1 (beta)

### Class Signature
`new Mongooz(dbUrl: string)`

### CRUD Methods Signature
1. (C)reate\
    `async insertMany(documents: any, lookUpOptions?: DbCollectionLookupI): Promise<InsertWriteOpResult<any>>`
        
2. (R)ead\
    `async findAll(query: FilterQuery<any>, lookUpOptions?: DbCollectionLookupI): Promise<Cursor<any>>`
        
3. (U)pdate\
    `async updateMany(filter: FilterQuery<any>, updateQuery: UpdateQuery<any>, lookUpOptions?: DbCollectionLookupI): Promise<UpdateWriteOpResult>`

4. (D)elete\
    `async deleteMany(filter: FilterQuery<any>, lookUpOptions?: DbCollectionLookupI): Promise<DeleteWriteOpResultObject>`

### Other Methods Signature
1. Open Connection\
    `async openConnection(): void`

2. Close Connection
    `async closeConnection(): void`
        

### Basic Usage
```typescript
import { Mongooz } from 'mongooz';


async main() {
    let mongooz: Mongooz = new Mongooz(dbUrl);
    
    // open connection
    mongooz.openConnection();

    // Create new Documents
    mongooz.insertMany([{name: "Josh"},{name: "Apt"}],{db: "data", collection: "person"});

    /**
     * Mongooz stores db and collection name used for previous
     * operation which allows you to ommit the lookUpOptions for
     * any preceding operation targeting the same db and collection
    */ 
    
    // Find all documents in the person collection stored in data db
    await mongooz.findAll({});
    
    // Update all the documents in person collection stored in data db
    await mongooz.updateMany({},{$set: {gender: "male"}});

    // delete all the documents in person collection stored in data db
    await mongooz.deleteMany({});

    // close the connection
    mongooz.closeConnection()
}

main().catch(err => console.error(err));

```

### Interfaces
1. DbCollectionLookupI\
   Signature: `{db: string, collection: string}`
