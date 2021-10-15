import {BoxHelper} from './box';
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();


router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/', router);

/*
app.get('/sharefolder', (req, res) => {
    const folder = req.query.folder;
    const root = req.query.root;

    const Helper = new BoxHelper();
    Helper.GetShareFolder(root, folder).then((result) => res.json(result));
});
*/

const server = app.listen(0, () => {
    console.log('box-rest --> listening ', server.address().port);
});
export {};
