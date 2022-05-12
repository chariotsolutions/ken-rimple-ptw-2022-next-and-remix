# Ken Rimple's PowerPlayer

...a silly little monorepo that shows you how Next.js and Remix.run
render static or near static cms content.

I've never really been a fan of "Hello World" demos. Generally my demos have
crazy titles, like drumlegend or powerplayer, and mostly it's because I love
to make huge names for silly little demos.

That said, this is a React-based Podcast Player monorepo that contains:

- db - a docker project to bootstrap a PostgreSQL database containing
  two tables, rss_feed and feed_item
- feed-loader - populates the database in db using a `feeds.opml` RSS
  podcast feed list file.
- server - a standard Express RESTful backend to serve web services for
  a few of the NextJS samples
- react-only-client - a simple React application that makes web service
  requests with fetch() to get data from our RESTful server (standard
  React code)
- nextjs-client - a Next.js server and client for demonstrating
  SWR, SSR, and SSG
- remix-client - a Remix.run server/client for demonstrating SSR with
  remix
- shared - a few shared classes

## To load the data into the database

Make sure you replace `packages/feed-loader/feeds.opml` with your feeds (or use
mine).

```bash
cd packages/feed-loader
yarn start
```

The service will connect to your database and the network and load the content.


The application is built using Yarn Berry. To set this up, install Node 17
or higher, install and boot Docker (for the postgres database), then:

```bash
$ corepack enable
$ yarn set version berry
$ yarn install
$ yarn dev

The servers will boot:

* Port 3000 - standard Create React App demo
* Port 3002 - Next.js
* Port 3003 - Remix.run
* Port 3010 - Express REST server
* Port 5432 - Postgresql

The credentials for remix and next and the other services are set in the
`.env` files in each directory.  This is just for demo purposes, don't ever
check in a real .env file with real credentials.

## To run Next.js, make sure you add any image thumbnail servers to next.config.js

```javascript
const nextConfig = {
...
  images: {
    // unsolved problem - data varies and urls are from many places
    // this is to protect security for <Image> tags, but you can't
    // use a wildcard like '*'
    domains: [
    'd3gih7jbfe3jlq.cloudfront.net',
    'other urls',
    ]
  }
  ...
}
```
More information coming soon. Enjoy!


