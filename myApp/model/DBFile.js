const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/RPA';// Connection URL
const dbName = 'File';// Database Name

var db;

MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
    db = client.db(dbName);
    db.file = db.collection('FileDB');
  });

  exports.addfile = function(f, callback){
    console.log('add file 호출됨' + f);
    //컬렉션에 데이터 추가할때는 배열 형태로 집어 넣는다
    db.file.insertOne({fieldname: f.fieldname, originalname: f.originalname, encoding: f.encoding, mimetype:f.mimetype, destination:f.destination, filename:f.filename, path: f.path, size:f.size},
        function(err, result){
            if (err) {
                callback(err, null);
                return;
            }
            //데이터가 추가됐다면 insertedCount 카운트가 0 보다 큰값이 된다
            if (result.insertedCount > 0) {
                console.log('파일 추가됨' + result.insertedCount);
                callback(null, result);
            }
            else {
                console.log('파일 추가 안됨' + result.insertedCount);
                callback(null, null);
            }
        }
    );
};
