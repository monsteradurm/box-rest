import {BoxHelper} from './box';
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/box-rest/', (req, res) => {
    res.json({ message: 'Nothing to see here.. move along' });
});


app.get('/box-rest/sharefolder', (req, res) => {
    const folder = req.query.folder;
    const root = req.query.root;
    const Helper = new BoxHelper();
    if (root && folder) {
        Helper.GetShareFolder(root, folder).then((result) => res.json(result));
    }
});

app.get('/box-rest/sharedfile', (req, res) => {
    const id = req.query.id;
    const Helper = new BoxHelper();
    if (id) {
        Helper.GetFileSharedLink(id).then((result) => res.json(result));
    }
});

app.get('/box-rest/subfolder', (req, res) => {
    console.log('Subfolder');
    const folder = req.query.folder;
    const root = req.query.root;
    const Helper = new BoxHelper();

    Helper.GetSubFolder(root, folder).then((result) => res.json(result));
});

app.get('/box-rest/thumbnail', (req, res) => {
    const id = req.query.id;
    const Helper = new BoxHelper();
    return Helper.GetThumbnail(id).then((result) => {
        res.json(result);
    });
});

app.post('/box-rest/thumbnails', (req, res) => {
    const ids = req.body;
    console.log('BODY', req.body);
    const Helper = new BoxHelper();
    return Helper.GetThumbnails(ids).then((result) => {
        res.json(result);
    });
});

app.get('/box-rest/folderItems', (req, res) => {
    const root = req.query.root;
    const Helper = new BoxHelper();

    Helper.GetFolderItems(root).then((result) => res.json(result));
});

app.get('/box-rest/folderInfo', (req, res) => {
    const root = req.query.id;
    const Helper = new BoxHelper();

    Helper.GetFolderInfo(root).then((result) => res.json(result));
});


const server = app.listen(() => {
    console.log('box-rest --> listening ', server.address().port);
});
export {};
