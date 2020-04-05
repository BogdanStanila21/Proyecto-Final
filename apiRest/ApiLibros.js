const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database: "proyectofinal"
});

connection.connect(function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Conexion Correcta");
  }
});

app.get("/book", function(request, response) {
  let sql;
  if (request.query.id == null) sql = "SELECT * FROM book";
  else sql = "SELECT * FROM book WHERE book_id =" + request.query.id;
  connection.query(sql, function(err, result) {
    if (err) console.log(err);
    else {
      response.send(result);
    }
  });
});

app.get("/book/:id", function(request, response) {
  let sql = "SELECT * FROM book WHERE book_id =" + request.params.id;
  connection.query(sql, function(err, result) {
    if (err) console.log(err);
    else {
      response.send(result);
    }
  });
});

app.post("/book", function(request, response) {
  let sentencia = new Array(
    request.body.tittle,
    request.body.author,
    request.body.year,
    request.body.editorial,
    request.body.type,
    request.body.description,
    request.body.photo,
    request.body.available
  );
  let sql =
    "INSERT INTO book (tittle,author,year,editorial,type,description,photo,available) VALUES (?,?,?,?,?,?,?,?)";
  console.log(sql);
  connection.query(sql, sentencia, function(err, result) {
    if (err) console.log(err);
    else {
      response.send(result);
    }
  });
});

app.put("/book", function(request, response) {
  console.log(request.body);
  let cambio = new Array(
    request.body.tittle,
    request.body.author,
    request.body.year,
    request.body.editorial,
    request.body.type,
    request.body.description,
    request.body.photo,
    request.body.available,
    request.body.book_id
  );
  let sql =
    "UPDATE book SET tittle=?,author=?,year=?,editorial=?,type=?,description=?,photo=?,available=? WHERE book_id=?";
  console.log(sql);
  connection.query(sql, cambio, function(err, result) {
    if (err) console.log(err);
    else {
      response.send(result);
    }
  });
});

// QUERY ES PARA CUANDO USAS EL ?ID= Y PARAMS CUANDO SOLO USAS EL /ID

app.delete("/book", function(request, response) {
  console.log(request.query.id);
  let sql = "DELETE FROM book WHERE book_id = '" + request.query.id + "'";
  console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) console.log(err);
    else {
      response.send(result);
    }
  });
});

app.listen(3003);
