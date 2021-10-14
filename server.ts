import {BoxHelper} from './box';
import express, { Request, Response, NextFunction } from 'express';

const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

const app = express();
const cors = require('cors');
const router = express.Router();

proxy.on('error', (e) => {
    console.log(e);
});


app.options('*', cors());

router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });
});
app.configure(() => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    });
    app.use( express.bodyParser() );
    app.use( express.methodOverride() );
    app.use('/api', router);
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

/*
app.get('/sharefolder', (req, res) => {
    const folder = req.query.folder;
    const root = req.query.root;

    const Helper = new BoxHelper();
    Helper.GetShareFolder(root, folder).then((result) => res.json(result));
});
*/

app.listen(process.env.PORT, () => {
        console.log('box-rest --> listening at:', process.env.PORT);
});

export {};
