const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/RPA';// Connection URL
const dbName = 'chat';// Database Name

var db;

MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
    db = client.db(dbName);
    db.chat = db.collection('chatDB');
  });

exports.chatList = function(obj){
    db.chat.find(obj.query).toArray(function(err, docs){
        if(err){
            console.log(err);
        }else{
            console.log(docs);
            obj.callback(docs);
        }
    });
}

exports.addchat = function(id, chat, d, callback){
    console.log('add Chat 호출됨 : ' + id);
    //컬렉션에 데이터 추가할때는 배열 형태로 집어 넣는다
    db.chat.insertOne({id: id, chat: chat, date: d},
        function(err, result){
            if (err) {
                callback(err, null);
                return;
            }
            //데이터가 추가됐다면 insertedCount 카운트가 0 보다 큰값이 된다
            if (result.insertedCount > 0) {
                console.log('댓글 추가 됨' + result.insertedCount);
                callback(null, result);
            }
            else {
                console.log('댓글 추가 안됨' + result.insertedCount);
                callback(null, null);
            }
        }
    );
};