const express = require('express')
const cors = require('cors');
const path = require('path');
const util = require( 'util' );
const multer  = require('multer')
const Database = require('../db/Database');

const upload = multer({dest: './public/Images/'});

const PORT = 3009;
const app = express();

app.use(cors({origin: "*",}));
app.use(express.json());
app.use(express.urlencoded({extended: true,}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static('public/Images'));

app.get('/api/getallboards', async (req, res) => {
    console.log('GET request on /api/getallboards');
    const boards = await Database.getAllBoards();
    console.log('boards: ', boards);
    res.send(boards);
});

app.get('/api/board/:tag?', async (req, res) => {
    const tag = req.query.tag;
    console.log('GET request on /api/board?tag=',tag);
    const board = await Database.getBoardFromTag(tag);
    res.send(board);
});

app.get('/api/threads/:tag?', async (req, res) => {
    const tag = req.query.tag;
    console.log('GET request on /api/threads?tag=', tag);
    const threads = await Database.getBoardThreadsFromTag(tag);
    res.send(threads);
});

app.post('/api/createthread', async (req, res) => {
    const data = req.body;
    console.log('POST request on /api/createthread with request body: ', data);
    const boardID = data.board_id;
    const subject = data.subject;
    const thumbnailURL = data.thumbnail_url;
    const username = data.user_name;
    const thumbnailInfo = data.thumbnail_info;
    const fullThumbnailPath = thumbnailInfo.path + '.' + thumbnailInfo.mimetype.split('/')[1];
    const thumbnailFilename = thumbnailInfo.filename;
    const thumbnailImageID = data.thumbnail_image_id;
    const comment = data.comment;
    await Database.createThread(boardID,subject,fullThumbnailPath, username, thumbnailFilename, thumbnailImageID, comment)
    res.send({});
});

app.post('/api/insertimage', async (req, res) => {
    const data = req.body;
    console.log('POST request on /api/insertimage with request body: ', data);
    const fileName = data.file_name;
    const fileType = data.file_type;
    const newImage = await Database.insertImage(fileName, fileType);
    res.send(newImage);
});

app.post('/fileupload', upload.single('file'), async (req, res) => {
    const requestFile = req.file;
    console.log('POST request on /fileupload with requestFile: ', requestFile);
    res.send(requestFile);
});

app.get('/file/:filename?', async (req, res) => {
    const filename = req.query.filename;
    console.log('GET request on /file?filename=',filename);
});

app.get('/image/:id?', async (req, res) => {
    const id = req.query.id;
    console.log('GET request on /image?id=',id);
    const imageData = await Database.getImageFromID(id);
    console.log('imageData: ', imageData);
    // const imagePath = 'http://localhost:3009/' + imageData.file_name + '.' + imageData.file_type;
    // const imagePath  = "localhost:3009/8d1df1ab259bd454173b48576cf0b2f5.png";
    // console.log('imagePath: '. imagePath);
    res.send(imageData);
});

app.listen(PORT, async () => {
    console.log('Server is listening at http://localhost:' + PORT);
});
