var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var url = require('url');
const path = require('path');
const routes = require('./routes');
const model = require('./model');
//var MongoClient = require('mongodb').MongoClient;
var url1 = "mongodb://revathykannan:admin123@ds123896.mlab.com:23896/employees"; //For Production
//var url1 = "mongodb://localhost:27017/employees";
mongoose.connect(url1)
    .connection
        .on('connected',function(){
            console.log("successfully connected to "+ url1)
        })
        .on('error',function(err){
            console.log("database error "+ err)
        })
var app = express();
//var port = 5000 ;


app.use(bodyParser.urlencoded({extended: true}));

app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","X-Requested-With");
    next();
    });

app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || port);

app.get('/get', function(req, res){
    
  var q= url.parse(req.url, true).query;
  var nameStr= q.name;
  var positionStr= q.position;
  var departmentStr= q.department;
  var salaryStr= q.salary;
  var query = { 'name': {$regex:new RegExp(nameStr,"i")},'position': {$regex:new RegExp(positionStr,"i")},'department': {$regex:new RegExp(departmentStr,"i")},'salary': {$regex:new RegExp(salaryStr,"i")}};
  res.writeHead(200, {'Content-Type': 'text/html'});
  
MongoClient.connect(url1, function(err, db) {
db.collection("employees").find(query).toArray(function(err, result) {
 console.log("name:" + nameStr);
  if (err) throw err;
  console.log(result);
  db.close();
  res.end(JSON.stringify(result));
});   
});
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/employees', routes);
app.use('/model',model);
app.use('/routes',routes);

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});
