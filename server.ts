import {BoxHelper} from './box';
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get('/box-rest/folderItems', (req, res) => {
    const folder = req.query.folder;
    const root = req.query.root;
    const Helper = new BoxHelper();

    if (root && folder) {
    Helper.GetSubFolderItems(root, folder).then((result) => res.json(result));
    }
    else if (root) {
        Helper.GetFolderItems(root).then((result) => res.json(result));
    }
});


const server = app.listen(() => {
    console.log('box-rest --> listening ', server.address().port);
});
export {};
