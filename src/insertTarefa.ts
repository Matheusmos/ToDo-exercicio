import mysql from 'mysql2';
import { OkPacket } from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user', 
    password: 'example', 
    database: 'example' 
});

// Função para inserir uma nova tarefa
const insertTask = (title: string, description: string) => {
    const query = `
        INSERT INTO tarefas (title, description)
        VALUES (?, ?);
    `;

    connection.query(query, [title, description], (err, results: OkPacket) => {
        if (err) {
            console.error('Erro ao inserir a tarefa:', err);
            return;
        }

        const taskId = results.insertId

        // Consultar a tarefa nova
        const selectQuery = `SELECT created_at FROM tasks WHERE id = ?`;
        connection.query(selectQuery, [taskId], (err, rows) => {
            if (err) {
                console.error('Erro ao obter a data de criação:', err);
                return;
            }

            const createdAt = rows[0]?.created_at;
            console.log(`Tarefa inserida com sucesso: ID ${taskId}, Criada em: ${createdAt}`);
        });
    });
};

// Conectar ao banco de dados e inserir uma nova tarefa
connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados.');

    insertTask('Minha nova tarefa', 'Descriçao');

    connection.end();
});
