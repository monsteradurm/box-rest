import {BoxHelper} from './box';
import express, { Request, Response, NextFunction } from 'express';

const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

const app = express();
const cors = require('cors');

proxy.on('error', (e) => {
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

app.listen(3000, () => {
        console.log('box-rest --> listening at: 3000');
});

export {};
