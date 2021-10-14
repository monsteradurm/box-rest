import {BoxHelper} from './box';
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000;
const cors = require('cors');

proxy.on('error', function(e) {
    console.log(e);
});


app.options('*', cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.send('Nothing to see here... move along');
  });

app.get('/sharefolder', (req, res) => {
    const folder = req.query.folder;
    const root = req.query.root;

    const Helper = new BoxHelper();
    Helper.GetShareFolder(root, folder).then((result) => res.json(result));
});

app.listen(port, () => {
        console.log('box-rest --> listening at: ' + port);
});

export {};
