const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

const url = require('url');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
//http://localhost:5001/api/users?id=5&token=nisha&geo=india
app.get('/api/users',function (req,res) {
    console.log(req.query);
    console.log("inside get of 5001 server");
    var user_id = req.query.id;
    var token = req.query.token;
    var geo = req.query.geo;
    res.send(user_id + ' ' + token + ' ' + geo);

});
app.post('/api/users', function(req, res) {
    console.log("inside post of 5001 server");
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    res.send(user_id + ' nisha  ' + token + ' nisha ' + geo);
});
