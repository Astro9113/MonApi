var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var fs= require("fs");


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("xiaoshuo");

    var myobj = { name: "卿卿吾妹", title: 'yanqing', insertTime: new Date().getTime(), img: '/xiaoshuo/image/qingqingwumei.jpg'};

    dbo.collection("shuming").insertOne(myobj, function(err, res) {

        if (err) throw err;

        console.log("文档插入成功");
        db.close();
    })

});
