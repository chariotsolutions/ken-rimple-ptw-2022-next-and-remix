import { queryForOne, queryForResults } from '~/shared/data-source.server';
// TODO better if monorepo built tsc is used rather than source...
import FeedDetails from '@powerplayer/shared/src/domains/feed_details';
import FeedItem from '@powerplayer/shared/src/domains/feed_item';

const maxFeedItems = process.env.MAX_FEED_ITEMS;
const maxFeeds = process.env.MAX_FEEDS;
const maxSlugs = process.env.MAX_SLUGS;
console.log(maxFeedItems, maxFeeds, maxSlugs);

export async function getFeeds() {
  const result = await queryForResults<FeedDetails>(
    `select id, name, image_url as "imageUrl", description, slug, feed_uri as "feedUri", 
           coalesce(last_pub_date, '1900-01-01') as "lastPubDate" 
           from rss_feed 
           order by name limit ${maxFeeds}`);

  return result.map(r => ({...r, lastPubDate: r.lastPubDate.toJSON()}))
}

export async function getFeedAndEpisodesBySlug(slug: string) {
  // TODO - put in one db session, now that we're on the server..
  const feedDetails = await queryForOne<FeedDetails>(
    `select id, name, image_url as "imageUrl", description, slug, feed_uri as "feedUri",
                        coalesce(last_pub_date, '1900-01-01') as "lastPubDate"
           from rss_feed where slug = $1::text 
           order by last_pub_date desc`, [slug]);
  const episodes = await queryForResults<FeedItem>(
    `select guid, title, description, enclosure_url as "enclosureUrl", 
                       coalesce(pub_date, '1900-01-01') as "pubDate" 
            from feed_item 
            where feed_id = $1::integer
            order by pub_date desc
            limit ${maxFeedItems}`,
    [feedDetails.id]);
  return {
    feedDetails: {...feedDetails, lastPubDate: feedDetails.lastPubDate.toJSON()},
    episodes: episodes.map(e => ({...e, pubDate: e.pubDate.toJSON()}))
  }
}

export async function getFeedInfoBySlug(slug: string) {
  const results = await queryForOne<FeedDetails>(
    `select id, name, image_url as "imageUrl", description, slug, feed_uri as "feedUri",
                  coalesce(last_pub_date, \'1900-01-01\') as "lastPubDate" 
           from rss_feed where slug = $1::text`, [slug]);
  return { ...results, lastPubDate: results.lastPubDate.toJSON()};
}

export async function getPodcastSlugs() {
  return await queryForResults<{slug: string}>('select slug from rss_feed');
}

export async function getGuidsForPodcastBySlug(slug: string) {
  return await queryForResults<string>(
    `select guid from feed_item where feed_id = 
               (select id from rss_feed where slug = $1::text)`, [slug]);
}

export async function getFeedItemsBySlug(slug: string) {
  return await queryForResults<FeedItem>(
    `select guid, title, description, enclosure_url as "enclosureUrl",
            coalesce(pub_date, '1900-01-01') as "pubDate" 
           from feed_item 
           where feed_id = 
                (select id from rss_feed where slug = $1::text) order by pub_date desc`, [slug]);
}

export async function getFeedItemByGuid(guid: string) {
  const result = await queryForOne<FeedItem>(
    `select guid, title, description, enclosure_url as "enclosureUrl",
                  coalesce(pub_date, \'1900-01-01\') as "pubDate" 
           from feed_item where guid = $1::text`, [guid]);
  return { ...result, pubDate: result.pubDate.toJSON() };
}

/**
 * For generating static routes for individual episodes - must have
 * the slug and guid for a given podcast to be pulled completely with all
 * relevant details
 */
export async function getSlugAndGuidsForPodcasts() {
  return await queryForResults<{slug: string, guid: string}>(
    `select slug, guid
     from rss_feed r, feed_item i
     where r.id = i.feed_id`
  );
}
