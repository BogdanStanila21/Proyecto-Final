let express = require("express");
let bodyParser = require('body-parser');
let app = express();
let cors = require('cors')
let mysql = require("mysql");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: null,
        database: "vitu"   //DDBB LIBROS
    });    

//conectando la ddbb
connection.connect(function(error){
    if(error){
       console.log(error);
    }else{
       console.log('Conexion correcta.');
    }
 });
//----------------------------------------------------------------------//

//Mostrar todos los Usuarios;
app.get("/user",(request,response)=>{
    let myUser=new Array(''+request.query.user_id+'')
    console.log(myUser)
    let sql;
    if (myUser=='undefined'){
        sql="SELECT * FROM user" 
    }else{
        sql="SELECT * FROM user WHERE user_id =?"
    }
    connection.query(sql,myUser,(err,result)=>{
        if (err){
            console.log(err)
        }else{
            response.send(result)
        }
    })
});

//Mostrar un usuario pasando su id;
app.get("/user/:user_id",(request, response)=>{
    let myUser=new Array(''+request.params.user_id+'');
    console.log(myUser)
    let sql;
    sql="SELECT * FROM user WHERE user_id=?"
    
    connection.query(sql,myUser,(err,result)=>{
        if (err){
            console.log(err)
        }else{
            response.send(result)
        }
    })
});

//Crear un nuevo Usuario;
app.post("/user",(request,response)=>{
    let sql;
    let myUser=new Array(
        request.body.nickname,
        request.body.name,
        request.body.sex,
        request.body.email,
        request.body.password,
        // request.body.aboutYou,
        // request.body.photo,
        request.body.place);
    console.log(myUser)
    sql="INSERT INTO user (nickname, name, sex, email, password, place) VALUES(?,?,?,?,?,?)";
    connection.query(sql,myUser,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            response.send(result)
        }
    })
});

//Actualizar un usuario
app.put("/user",(request,response)=>{
    let sql;
    let myUser=new Array(
        request.body.name,
        request.body.nickname,
        request.body.sex,
        request.body.email,
        request.body.password,
        request.body.aboutYou,
        request.body.photo,
        request.body.place,
        request.body.user_id);
    sql="UPDATE user SET name=?, nickname=?, sex=?, email=?, password=?, aboutYou=?, photo=?, place=? WHERE user_id=?"
    connection.query(sql,myUser,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            response.send(result);
        }
    })
});

//Eliminar un usuario
app.delete("/user",(request,response)=>{
    let sql;
    let myUser=new Array(''+request.body.user_id+'');
    sql="DELETE FROM user WHERE user_id=?";
    connection.query(sql,myUser,(err,result)=>{
        if(err){
        console.log(err);
        }else{
            response.send(result);
        }
    })
});
//Api para el login
app.post("/user/login",(request,respose)=>{
    let sql;
    let login=new Array(request.body.nickname, request.body.password);
    sql="SELECT user_id FROM user WHERE nickname=? && password=?";
    connection.query(sql,login,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            respose.send(result)
        }
    })
})
//Api para favoritos
app.get("/favorites/:user_id", function(req, res, next)
    { let fav=new Array(''+req.params.user_id+'')
        connection.query("SELECT book.photo, user.nickname, user.place, favorites_id FROM favorites JOIN user ON (favorites.user_id = user.user_id) JOIN book ON (favorites.book_id = book.book_id) WHERE favorites.user_id =?",fav, function(err, result)
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


app.listen(3000);