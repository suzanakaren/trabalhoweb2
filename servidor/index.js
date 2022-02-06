const express = require('express');
const app= express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: '99149292*Skg',
    database: "cruddatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get", (req,res) => {
    const sqlSelect = "SELECT * FROM consultas";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
});

app.post("/api/insert", (req,res) => {
    const nome_paciente = req.body.nome_paciente;
    const contato_paciente = req.body.contato_paciente;

    const sqlInsert = "INSERT INTO consultas (nome_paciente, contato_paciente) VALUES (?, ?)";
    db.query(sqlInsert, [nome_paciente, contato_paciente], (err, result) => {
        console.log(result);
    })
});

app.delete("api/delete/:nome_paciente", (req, res) => {
    const nome = req.params.nome_paciente;
    const sqlDelete = "DELETE FROM consultas WHERE nome_paciente = ?";
      
    db.query(sqlDelete, nome, (err, result) => {
        if (err){console.log(err)}
    });
  });

app.put("api/update/:nome_paciente", (req, res) => {
    const nome = req.body.nome_paciente;
    const contato =  req.body.contato_paciente;
    const sqlUpdate = "UPDATE consultas SET nome_paciente = ? WHERE nome_paciente = ?";
      
    db.query(sqlUpdate, [nome, contato], (err, result) => {
        if (err){console.log(err)}
    });
});

app.listen(3001, () => {
    console.log("running port 3001");
});