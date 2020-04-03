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
        database: "proyectofinal"   //DDBB LIBROS
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
        request.body.name,
        request.body.nickname,
        request.body.sex,
        request.body.email,
        request.body.password,
        request.body.aboutYou,
        request.body.photo,
        request.body.place);
    console.log(myUser)
    sql="INSERT INTO user (name, nickname, sex, email, password, aboutYou, photo, place) VALUES(?,?,?,?,?,?,?,?)";
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

app.listen(3000);