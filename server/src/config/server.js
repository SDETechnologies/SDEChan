const express = require('express')
const cors = require('cors');
const util = require( 'util' );
const Database = require('../db/Database');

const PORT = 3009;
const app = express();

app.use(cors({origin: "*",}));
app.use(express.json());
app.use(express.urlencoded({extended: true,}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/getallboards', async (req, res) => {
    console.log('GET request on /api/getallboards');
    const boards = await Database.getAllBoards();
    console.log('boards: ', boards);
    res.send(boards);
});

app.get('/api/board/:name?', async (req, res) => {
    const name = req.query.name;
    console.log('GET request on /api/board?name=',name);
    const board = await Database.getBoardFromName(name);
    res.send(board);
});

app.post('/api/createthread', async (req, res) => {
    const data = req.body;
    console.log('POST request on /api/createthread with request body: ', data);
    res.send({});
});

app.listen(PORT, async () => {
    console.log('Server is listening at http://localhost:' + PORT);
});
