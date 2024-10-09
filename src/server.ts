import express, { Request, Response } from 'express';
import mysql from 'mysql2';


const app = express();
const PORT = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user', 
    password: 'example', 
    database: 'example' 
});