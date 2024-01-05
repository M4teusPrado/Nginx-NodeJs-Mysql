const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',  // Alterado para o nome do serviço no Docker Compose
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

// Conectar ao banco de dados
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }

    console.log('Conectado ao banco de dados MySQL');
    
    // Realizar a consulta para inserção de dados
    const sql = `INSERT INTO people(name) VALUES('Mateus')`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Dados inseridos com sucesso!');
    });

    // Iniciar o servidor Express somente após realizar a consulta
    app.get('/', (req, res) => {
        connection.query('SELECT name FROM people', (err, results) => {
            if (err) throw err;
            res.send('<h1>Full Cycle Rocks!</h1>' + results.map(p => p.name).join('<br>'));
        });
    });

    app.listen(port, () => {
        console.log('Rodando na porta ' + port);
    });
});
