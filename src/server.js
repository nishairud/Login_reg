const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const url = require('url');;
const request = require('request');
var mysql = require('mysql');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

//CORS- if not added it will not listen from the React LoginForm.js(3001 server)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



// create a GET route
app.get('/express_backend1', (req, res) => {
    console.log("inside get of 5000 server");
    var result;
    request.post('http://localhost:5001/api/users/', {
        json: {
            id: 'apt10',
            geo: "geoNisha",
            token: "tokenSatheeh"
        }
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode 5000server: ${res.statusCode}`);
        console.log(body);
        // result = JSON.parse(body);
        console.log(result);
    }

    )
    res.send('Hellowww' + result);
});

app.get('/express_backend', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "enrollmentDetails"
    });
    con.connect();
    con.query('select * from users', function (error, results, fields) {
        if (error) throw error;
        console.log('result', results);
        res.json(results);
    })
});

app.get('/latest_user', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "enrollmentDetails"
    });
    con.connect();
    con.query('select name from users order by id desc Limit 1;', function (error, results, fields) {
        if (error) throw error;
        console.log('result for loginusername', results);
        if (results && results.length > 0) {
            res.json(results[0]);
        }
    })
});

//for receiving the JSON object
app.use(express.json());
app.post('/express_backend', function (req, res) {

    console.log("inside post of 5000 server");
    console.log(req.body);
    var user_id = req.body.username;
    var pass = req.body.password;
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "enrollmentDetails"
    });
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var q = "Select * from users";
    con.query(q, function (error, results, fields) {
        if (error) throw error;

    });
    var person = {
        name: user_id,
        password: pass
    }
    con.query('INSERT INTO USERS SET ?', person, function (error, result) {
        if (error) throw error;
        console.log(result);
        // res.send(result);
        res.end(JSON.stringify(result));
    });
    con.end();
    //res.send(user_id + ' nisha  ' + pass);
    // res.send(JSON.stringify(result));
});

///update operation.
app.post('/updateMemInfo', function (req, res) {

    console.log("inside updatememInfo post of 5000 server");
    console.log(req.body);
    var user_id = req.body.username;
    var pass = req.body.password;
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "enrollmentDetails"
    });
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var q = "Select * from users";
    con.query(q, function (error, results, fields) {
        if (error) throw error;

    });
    var person = {
        name: user_id,
        password: pass,
        id :req.body.id
    }
    var memberDetails =[user_id, pass, req.body.id];
    con.query('UPDATE USERS SET name =?, password=? where id= ?', memberDetails, function (error, result, fields) {
        if (error) throw error;
        console.log(result);
        // res.send(result);
        res.end(JSON.stringify(result));
    });
    con.end();
    //res.send(user_id + ' nisha  ' + pass);
    // res.send(JSON.stringify(result));
});


///delete operation
app.post('/deleteField', function (req, res) {

    console.log("inside deleteField post of 5000 server");
    console.log(req.body);
    var id = req.body.id;
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "enrollmentDetails"
    });
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var person = {
        id :req.body.id
    }
    var memberDetails =[id];
    con.query('delete  from USERS where id= ?', memberDetails, function (error, result, fields) {
        if (error) throw error;
        console.log(result);
        // res.send(result);
        res.end(JSON.stringify(result));
    });
    con.end();
    //res.send(user_id + ' nisha  ' + pass);
    // res.send(JSON.stringify(result));
});