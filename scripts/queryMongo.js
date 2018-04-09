var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("xiaoshuo");
    var whereStr = {"name":'卿卿吾妹'}; // 查询条件
    dbo.collection("shuming").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        // console.log(result.length);
        console.log(result);
        db.close();
    });
});
