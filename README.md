# MongoDB Index time-to-live usage

A tutorial about how to use MongoDB index' ttl feature in NodeJS.

### Set up the MongoDB initialization

Initialize your connection to the MongoDB

```
const MongoClient = require('mongodb').MongoClient;

//Set your database
const yourMongoDatabase = "usersJwt"

//Set your url with database
const url = "mongodb://localhost:27017/" + yourMongoDatabase;

//Connect
MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  
  //Retrieve your chosen database and collection (table)
  let dbo = db.db(yourMongoDatabase);
  let myCollection = "tokens";
});
```

### Create an Indexer for your collection

```
dbo.collection(myCollection)
  .createIndex({ "createdAt": 1 }, { expireAfterSeconds: 30 },
      (err, dbResult) => {
          if (err) throw err;
          console.log("Index Created");
      });
```

The ``createdAt`` field is mendatory for the indexer to know when to delete the data. If the indexer is set to delete the data every 30 seconds, it will delete it when the time is up.

The ``expireAfterSeconds`` is the field you tell your database to delete data older than 30 seconds. It is ideal to deal with tokens and user's shopping sessions.

### Create a data

```
//Prepare your document
let document = {
    createdAt: new Date(),
    jwt: "example-jwt_ey720adada8fa7241nas",
    owner: "ExampleUserName"
};
```

Take a closer look at the first field: 'createdAt' which is set by the current time ``new Date()`` to tell the indexer for future removal of the record.

### Insert the data
```
//Insert the prepared document
dbo.collection(myCollection).insert(document, (err, doc) => {
    if (!err)
      console.log('Document inserted');
      db.close();
});
```

## Database overview
Now let's see the index we inserted into the database.

# Image 1
![img](https://github.com/knoxgon/mongodb-index-ttl/blob/master/mongodb-index1.png)

# Image 2

The index is successfully created with the property TTL. The TTL has 30 seconds timeout.

![img](https://github.com/knoxgon/mongodb-index-ttl/blob/master/mongodb-index2.png)

# The inserted document
![img](https://github.com/knoxgon/mongodb-index-ttl/blob/master/mongodb-document.png)

It will be removed after the initial 30 seconds timeout.
