var express = require('express')
var sqlite3 = require('sqlite3').verbose()
var bodyparser = require('body-parser')
var app = express()
var db = new sqlite3.Database('./src/note-app')



app.use(express.static('./'))
app.use(bodyparser.json({limit:'50mb'}))
app.use(bodyparser.urlencoded({extended : true}))



app.post('/insert', function(req, res){
  console.log(req.body)
  res.header('Access-Control-Allow-Origin', '*');

  db.serialize(function(){
    db.run("INSERT INTO note ('priority', 'title', 'data', 'due_date', 'date') VALUES (?,?,?,?,?)", req.body.priority, req.body.title, req.body.data, req.body.due_date, req.body.date);

    res.status(201).end();

  })

})

app.get('/data', function(req, res){

  var tmp_arr = []
  res.header('Access-Control-Allow-Origin', '*');
  
  db.serialize(function(){

    db.each('SELECT * FROM note', function(err, row) {
      tmp_arr.push(row);
    }, function () {
      res.json({
        'note' : tmp_arr
      }).end();
    })
  })

})

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
