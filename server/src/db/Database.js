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

    async getBoardFromTag(tag){
        try {
            const sql = 'SELECT * FROM boards WHERE tag = ?';
            const results = await db.query(sql, [tag]);
            return results.length != 0 ? results[0] : null;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getBoardThreadsFromTag(boardTag){
        try {
            const sql = 'SELECT * FROM threads A, boards B WHERE B.tag = ?';
            const results = await db.query(sql, [boardTag]);
            return results;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async createThread(boardID, subject, thumbnailURL = null, userName = 'Anonymous', thumbnailFileName, thumbnailImageID, comment){
        const sql = 'INSERT INTO threads (board_id, subject, user_name, thumbnail_url, thumbnail_file_name, thumbnail_image_id, comment) VALUES (?,?,?,?,?,?,?)';
        await db.query(sql, [boardID, subject, userName, thumbnailURL, thumbnailFileName, thumbnailImageID, comment]);
    }

    async insertImage(fileName, fileType){
        const sql = 'INSERT INTO images (file_name, file_type) VALUES (?,?)'
        await db.query(sql, [fileName, fileType]);
        const sql2 = 'SELECT * FROM images WHERE file_name = ?';
        const result = await db.query(sql2, [fileName]);
        console.log('result: ', result);
        return result.length != 0 ? result[0] : null;
    }

    async getImageFromID(imageID){
        const sql = 'SELECT * FROM images WHERE id = ?';
        const result = await db.query(sql, [imageID]);
        return result.length != 0 ? result[0] : null;
    }
}

module.exports = new Database();