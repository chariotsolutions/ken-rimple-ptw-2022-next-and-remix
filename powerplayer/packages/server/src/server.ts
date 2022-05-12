// TODO - fix this to use built class?
import { sleep } from './utils/sleep';
import * as express from 'express';
import * as cors from 'cors';
// silly CJS import
import {faker} from '@faker-js/faker';
// activate configuration params
import './config';

import podcastsRoute from './routes/podcasts';
const app = express();
app.use(cors({
    origin: '*'
}));

const port = process.env.EXPRESS_PORT;
app.use('/podcasts', podcastsRoute);

app.get('/', (req, res) => res.send(`Hello, ${req.query.name} !`));

app.get('/delayedpayload', async (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    // send chunked response
    res.write('{ "messages": [');
    for (let i = 0; i < 10; i++) {
        const fakeResults = [];
        for (let j = 0; j < 100; j++) {
            fakeResults.push(faker.name.findName());
        }
        res.write(`{ "message": "${fakeResults.concat(' ')}" }`);

        if (i < 9) {
            res.write(',');
        }

        await sleep(1000);
    }
    res.write('] }');
    res.end();
});

app.listen(port, () => { console.log(`started on port ${port}`)});
