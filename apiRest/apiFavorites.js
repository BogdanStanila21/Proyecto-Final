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


//GET que obtiene en favoritos la url de la portada del libro, el nickname y la ciudad del propietario y el id de ese favoritos
app.get("/favorites", function(req, res, next)
    {
        connection.query("SELECT book.photo, user.nickname, user.place, favorites_id FROM favorites JOIN user ON (favorites.user_id = user.user_id) JOIN book ON (favorites.book_id = book.book_id) WHERE favorites.user_id = " + [req.query.id], function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("GET de favoritos");
                }
            }
        );
    }
);


app.post("/favorites", function(req, res, next)
    {
        let variable = "INSERT INTO favorites (user_id, book_id) VALUES (?,?)";
        let variable2 = [req.body.user_id, req.body.book_id];

        connection.query(variable, variable2, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("POST de favoritos");
                }
            }
        );
    }
);


// //no entiendo qué debe hacer este en favoritos, pero funciona
// app.put("/favorites", function(req, res, next)
//     {
//         let variable = "UPDATE favorites SET user_id=?, book_id=? WHERE user_id = " + [req.query.id];
//         let variable2 = [req.body.user_id, req.body.book_id];

//         connection.query(variable, variable2, function(err, result)
//             {
//                 if(err){
//                     console.log(err)
//                 }else{
//                     res.send(result);
//                     console.log("PUT de favoritos");
//                 }
//             }
//         );
//     }
// );


app.delete("/favorites", function(req, res, next)
    {
        let variable = "DELETE FROM favorites WHERE favorites_id = " + [req.body.favorites_id];

        connection.query(variable, function(err, result)
            {
                if(err){
                    console.log(err);
                }else{
                    res.send(result);
                    console.log("DELETE de favoritos");
                }
            }
        );
    }
);




app.listen(3000);