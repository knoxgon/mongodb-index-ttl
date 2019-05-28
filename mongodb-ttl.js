const MongoClient = require('mongodb').MongoClient;

//Set your database
const yourMongoDatabase = "usersJwt"
//Set your url with database
const url = "mongodb://localhost:27017/" + yourMongoDatabase;

//Connect to your database
MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    //Retrieve your chosen database
    let dbo = db.db(yourMongoDatabase);

    //Set your collection
    let myCollection = "tokens";

    /*  Create a mongodb index to remove any document with 'createdAt' 
       field every 30 seconds.
   */
    dbo.collection(myCollection)
        .createIndex({ "createdAt": 1 }, { expireAfterSeconds: 30 },
            (err, dbResult) => {
                if (err) throw err;
                console.log("Index Created");
                db.close();
            });


    //Prepare your document
    let document = {
        createdAt: new Date(),
        jwt: "example-jwt_ey720adada8fa7241nas",
        owner: "ExampleUserName"
    };
    /*
        It is required that you have the field 'createdAt' in your document (table)
        so the mongodb indexer can go through and remove it based on the TTL condition
    */

    //Insert the prepared document
    dbo.collection(myCollection).insert(document, (err, doc) => {
        if (!err) console.log('Document inserted');
        db.close();
    });
});
