import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user', 
    password: 'example', 
    database: 'example' 
});

const createTable = `
CREATE TABLE IF NOT EXISTS tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pendente', 'concluída', 'em progresso') DEFAULT 'pendente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`;

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados.');

    connection.query(createTable, (err, results) => {
        if (err) throw err;
        console.log('Tabela "tarefas" criada ou já existe.');
        connection.end();
    });
});
