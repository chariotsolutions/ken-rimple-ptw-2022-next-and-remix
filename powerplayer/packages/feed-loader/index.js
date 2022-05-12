const fs = require ("fs");
const opml = require ("opml");
const slugify = require('slugify');
const Parser = require('rss-parser');
const parser = new Parser();
const initOptions = {};
const pgp = require('pg-promise')(initOptions);

// use dotenv to load db connection for docker from .env into process.env
require('dotenv').config();

function getConnection() {
  return pgp({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB
  });
}

function getFeedsFromOpmlFile(opmlFile) {
  return new Promise((resolve, reject) => {
    fs.readFile(opmlFile, function (err, opmltext) {
      if (!err) {
        opml.parse(opmltext, function (err, theOutline) {
          if (!err) {
            return resolve(theOutline);
          } else {
            console.log('parse error', err);
            return reject(err);
          }
        });
      } else {
        console.log('read file error', err);
        return reject(err);
      }
    });
  });
}

async function readFeedDataFromFeed(feedName, rssUrl) {
  try {
    let feedData = await parser.parseURL(rssUrl);
    return feedData;
  } catch (e) {
    //console.error(e);
    return null;
  }
}

async function processFeed(connection, url, feedData) {
  try {
    let imageUrl = feedData.image?.url || feedData.itunes?.image || null;
    if (!imageUrl) {
      const {items, ...rest}  = feedData;
      console.log('no image or itunes.image', feedData.title, feedData.link);
    }

    const {id} = await connection.one(
      'INSERT INTO rss_feed(name, slug, feed_uri, image_url, description, last_pub_date) ' +
      'values ($1, $2, $3, $4, $5, $6) RETURNING id',
      [feedData.title, slugify(feedData.title), url, imageUrl, feedData.description, feedData.pubDate]);
    await processFeedItems(connection, id, feedData);

  } catch (e) {
    throw e;
  }
}

function processFeedItems(connection, feedId, feedData) {
  feedData.items.forEach(async (item) => {
    try {
      await insertFeedItem(connection, feedId, item);
    } catch (e) {
      throw e;
    }
  })
}

async function insertFeedItem(connection, feedId, item) {
  // because, um, RSS feeds are dirty
  if (!item.guid || !item.enclosure || !item.enclosure.url) {
    console.log('skipping', item.title);
    return true;
  }
  try {
    await connection.none(
      'INSERT INTO feed_item(feed_id, guid, title, description, enclosure_url, pub_date) ' +
      'VALUES($1, $2, $3, $4, $5, $6)',
      [feedId, item.guid, item.title, item.content, item.enclosure.url, item.pubDate]
    );
  } catch (e) {
    throw e;
  }
}

(async () => {
  const connection = getConnection();
  const opmlDocument = await getFeedsFromOpmlFile('feeds.opml');
    opmlDocument['opml']['body']['subs'].forEach((feed) => {
      readFeedDataFromFeed(feed.text, feed.xmlUrl)
        .then(feedData => feedData && processFeed(connection, feed.xmlUrl, feedData));
    });
})();
