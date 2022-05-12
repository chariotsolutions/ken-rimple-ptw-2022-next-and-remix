import { queryForOne, queryForResults } from './data-source';
import FeedDetails from '@powerplayer/shared/src/domains/feed_details';
import FeedItem from '@powerplayer/shared/src/domains/feed_item';

export async function getFeeds(numRows = null) {
  console.log(`limit is ${numRows}`);
  const sql = `select * from rss_feed order by name `;
  if (numRows > 0) {
    return await queryForResults<any>(`${sql} LIMIT $1::bigint`, [numRows] );
  } else {
    return await queryForResults<any>(`${sql} LIMIT ALL`) ;
  }
}

export async function getFeedInfoBySlug(slug: string) {
  return await queryForOne<FeedDetails>(`select 
    id, name, image_url as "imageUrl",
    description, slug, feed_uri as "feedUri", 
    last_pub_date as "lastPubDate"
from rss_feed where slug = $1::text`, [slug]);
}

export async function getFeedItemsBySlug(slug: string) {
 return await queryForResults<FeedItem>(
   `select guid, feed_id as "feedId",
       title, description, enclosure_url as "enclosureUrl",
       pub_date as "pubDate" from feed_item where feed_id = (select id from rss_feed where slug = $1::text)`, [slug]);
}

export async function getFeedItemByGuid(guid: string) {
  return await queryForResults<FeedItem>(
    `select * from feed_item where guid = $1::text`, [guid]);
}
