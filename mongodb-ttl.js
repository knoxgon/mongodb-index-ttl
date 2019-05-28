const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/jwt";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    var dbo = db.db("jwt");

    var document = { createdAt: new Date(), name: "David", title: "About MongoDB" };

    dbo.collection("tokens").insert(document, (err, doc) => {
        if (!err) console.log('Created');
    });

    /*dbo.collection("tokens")
        .createIndex({ "lastModifiedDate": 1 }, { expireAfterSeconds: 30 },
            function (err, res) {
                if (err) throw err;
                console.log("Index Created");
                db.close();
            });*/
});

