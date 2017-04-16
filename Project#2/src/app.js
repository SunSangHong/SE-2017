var express = require('express')
var sqlite3 = require('sqlite3').verbose()
var bodyparser = require('body-parser')
var app = express()
var db = new sqlite3.Database('./src/note-app')



app.use(express.static('./'))
app.use(bodyparser.json({limit:'50mb'}))
app.use(bodyparser.urlencoded({extended : true}))



app.post('/insert', function(req, res){
  console.log(req);
  console.log(req.body)
  res.send("ASDSA");
  // console.log(req.body.note)
  // db.serialize(function(){
  //   var stmt = db.prepare("INSERT INTO note VALUES (?)")
  //   stmt.run(req.body.note)
  //
  //   stmt.finalize();
  //
  //   res.send(req.body.note)
  //
  // })

})

app.get('/data', function(req, res){

  var tmp_arr = []

  db.serialize(function(){

    db.each('SELECT * FROM note', function(err, row) {
      console.log(row)
      tmp_arr.push(row);
      console.log(tmp_arr);
    })
    setTimeout(function () {
      res.json({
        'note' : tmp_arr
      }).end();
    });
  })

})

// app.get('/insert', function(req, res){
//   db.serialize(function(){
//
//     var stmt = db.prepare("INSERT INTO note VALUES (?)")
//
//     for(var i=1;i<=10;i++){
//       stmt.run('Note' + i);
//     }
//
//     stmt.finalize();
//
//     res.send('Inserted!')
//
//   })
//
// })

app.get('/reset', function(req, res){
  db.serialize(function(){

    db.run('DELETE FROM note')

    res.send('Deleted!')

  })

})

app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.listen(3000, function (){
  console.log('example app listening on port 3000')
})
