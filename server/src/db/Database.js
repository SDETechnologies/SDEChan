const mysql = require('mysql');
const util = require( 'util' );

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "sdechan"
})

db.query = util.promisify(db.query);

class Database{
    Database(){}

    async getAllBoards(){
        
        console.log('getAllBoards()');

        try {
            const sql = 'SELECT * FROM boards';
            const results = await db.query(sql, []);
            return results;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getBoardFromName(name){
        try {
            const sql = 'SELECT * FROM boards WHERE name = ?';
            const results = await db.query(sql, [name]);
            return results.length != 0 ? results[0] : null;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getBoardThreadsFromName(boardName){
        try {
            const sql = 'SELECT * FROM threads A, boards B WHERE B.name = ?';
            const results = await db.query(sql, [boardName]);
            return results;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async createThread(boardID, title, thumbnailURL = null, userID = null){
        const sql = 'INSERT INTO threads (board_id, title, user_id, thumbnail_url) VALUES (?,?,?,?)';
        await db.query(sql, [boardID, title, userID, thumbnailURL]);
    }
}

module.exports = new Database();