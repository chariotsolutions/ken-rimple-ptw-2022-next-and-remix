// TODO - maybe move these to built versions?
import FeedItem from '@powerplayer/shared/src/domains/feed_item';
import FeedDetails from '@powerplayer/shared/src/domains/feed_details';
import * as express from 'express';
import * as Parser from 'rss-parser';
import {sleep} from '../utils/sleep';
import { getFeedInfoBySlug, getFeedItemByGuid, getFeedItemsBySlug, getFeeds } from '../db/feed-api';

const router = express.Router();
const parser = new Parser();

router.get('/feed/:slug', async (req, res) => {

    // if configured, sleep for default interval
    if (req.query.delayResponse) {
        console.log('delaying response!')
        await sleep();
    }

    // what show are we querying?
    const slug = req.params.slug;
    if (!slug) {
        res.send({
            statusCode: 400,
            statusText: 'No slug parameter'
        });
        return;
    }

    try {
        // get the feed info - 1st and only row at the moment
        // TODO could pull ID and send to getFeedItems method in API
        const feedDetails: FeedDetails = (await getFeedInfoBySlug(slug));
        const episodes: FeedItem[] = (await getFeedItemsBySlug(slug));

        if (!feedDetails) {
            console.error('Not a valid feed');
            res.send({
                statusCode: 500,
                statusText: 'Not a valid feed'
            });
        }
        res.send({ feedDetails, episodes });
    } catch (e) {
        res.send(e.toString());
        res.status(500);
    }
});

interface FeedsQueryTypes {
    numRows: string
}

router.get('/feeds', async (req, res) => {
    if (req.query.delayResponse) {
        console.log('delaying response!')
        await sleep();
    }
    // await sleep();

    let numRows = Number.parseInt(req.query.numRows as string, 10) || undefined;
    console.log(`request numRows is ${numRows}`);
    const feeds  = await getFeeds(numRows);

    res.json(feeds);
});

router.get('/episode/:guid', async (req, res) => {
    if (!req.params.guid || typeof req.params.guid !== 'string') {
      res.sendStatus(404);
    } else {
        const result = await getFeedItemByGuid(req.params.guid);
        res.send(result[0]);
    }
});

export default router;
