var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');
/*
app.get('/',function(req, res){
    res.send('Yeah its working');
});
*/

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist',function(req, res){
    db.contactlist.find(function (err, docs) {
        //console.log(docs);
        res.json(docs);
    });
});

app.post('/contactlist',function (req, res) {
   console.log(req.body);
   db.contactlist.insert(req.body, function (err,docs) {
       res.json(docs);
   })
});

app.delete('/contactlist/:id', function(req, res){
   var id = req.params.id;
    db.contactlist.remove({_id: mongojs.ObjectID(id)}, function (err, docs) {
        res.json(docs);
    })
   //console.log(id);
});

app.get('/contactlist/:id',function (req, res) {
    var id = req.params.id;
    db.contactlist.findOne({_id: mongojs.ObjectID(id)}, function (err, docs) {
        res.json(docs);
    });
    //console.log(id);
});

app.put('/contactlist/:id',function (req, res) {
    var id = req.params.id;
    db.contactlist.findAndModify({query:{_id: mongojs.ObjectID(id)},
        update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},
        new:true}, function (err, docs) {
        res.json(docs);
    });
});

app.listen(3000);
console.log("server is running on port 3000");