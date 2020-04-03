const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var mysql = require("mysql");
let cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: null,
        database: "vitu"
    }
);

/////////

connection.connect(function(err)
    {
        if(err){
            console.log(error);
        }else{
            console.log("Conexión correcta");
        }
    }
);

/////////


app.get("/requested", function(req, res, next)
    {
        connection.query("SELECT requested_id, book.photo, user.nickname, user.place FROM requested JOIN book ON (requested.book_id = book.book_id) JOIN user ON (requested.user_id = user.user_id) WHERE requested.requested_id = " +  [req.query.id], function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("GET de solicitudes");
                }
            }
        );
    }
);


app.post("/requested", function(req, res, next)
    {
        let variable = "INSERT INTO requested (user_idRequest, book_id, user_id, status) VALUES (?,?,?,?)";
        let variable2 = [req.body.user_idRequest, req.body.book_id, req.body.user_id, req.body.status];

        connection.query(variable, variable2, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("POST de solicitudes");
                }
            }
        );
    }
);


app.put("/requested", function(req, res, next)
    {
        let variable = "UPDATE requested SET status = ? WHERE requested_id = " + [req.query.id];
        let variable2 = [req.body.status];

        connection.query(variable, variable2, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("PUT de solicitudes");
                }
            }
        );
    }
);


app.delete("/requested", function(req, res, next)
    {
        let variable = "DELETE FROM requested WHERE requested_id = " + [req.body.requested_id];

        connection.query(variable, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("DELETE de solicitudes");
                }
            }
        );
    }
);




app.listen(3000);