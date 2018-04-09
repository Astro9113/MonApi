var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var fs= require("fs");


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("xiaoshuo");

    for (var i=1; i <=75; i++) {
        fs.readFile('./qingqingwumei/卿卿吾妹_分节阅读_第' + i.toString() + '节.txt',function(err,data){
            if(err){
                console.log("bad")
            }else{
                console.log("ok");

                var myobj = { name: "卿卿吾妹", title: '第' + i.toString() + '节', content: data.toString() };

                dbo.collection("yanqing").insertOne(myobj, function(err, res) {

                    if (err) throw err;
                    console.log("文档插入成功");
                    db.close();
                })
            }
        })
    }

});
