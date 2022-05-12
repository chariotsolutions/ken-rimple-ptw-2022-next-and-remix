import * as Parser from 'rss-parser';
import FeedItem from '@powerplayer/shared/lib/domains/feed_item';

// TODO - externalize max num feed items
const MAX_FEED_ITEMS = 50;

const parser = new Parser();

export async function load_rss_feed(uri: string): Promise<FeedItem[]> {
   const feed = await parser.parseURL(uri);
   let numItems = feed.items.length;
   // TODO - re-integrate max feed items from query
   //if (numItems > 0 && typeof req.query.numItems === 'string') {
   //   numItems = Number.parseInt(req.query.numItems);
   //} else if (numItems > MAX_FEED_ITEMS) {
   // etc...
   if (numItems > MAX_FEED_ITEMS) {
      numItems = MAX_FEED_ITEMS;
   }

   // TODO re-integrate sleep param

   return feed
     .items
     .slice(0, numItems)
     .filter(i => i.enclosure && i.enclosure.url && i.itunes && i.itunes.image)
     .map(item => {
        return {
           description: item.contentSnippet || 'No show notes',
           link: item.link,
           guid: item.guid,
           pubDate: item.pubDate,
           title: item.title,
           audioFile: item.enclosure.url,
           image: item.itunes.image
        } as FeedItem;
     });
}
