/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/swr/podcasts',
        permanent: true
      }
    ]
  },
  experimental: {
    // THIS FIXES the imports from external monorepo dirs like the @powerplayer/shared project
    // THANK YOU Drew DeCarme for finding this!
    externalDir: true
  },
  images: {
    // unsolved problem - data varies and urls are from many places
    // this is to protect security for <Image> tags, but you can't
    // use a wildcard like '*'
    domains: [
    'd3gih7jbfe3jlq.cloudfront.net',
    'hotdogsladies.squarespace.com',
    'ichef.bbci.co.uk',
    'media.computer.org',
    'static.libsyn.com',
    'www.wadesguitarshop.com',
    'artwork.captivate.fm',
    'assets.fireside.fm',
    'assets.pippa.io',
    'cdn.images.adorilabs.com',
    'cdn.simplecast.com',
    'chariotsolutions.com',
    'content.production.cdn.art19.com',
    'craphound.com',
    'd3t3ozftmdmh3i.cloudfront.net',
    'elroy.twit.tv',
    'i1.sndcdn.com',
    'image.simplecastcdn.com',
    'images.transistor.fm',
    'media.npr.org',
    'media.wnyc.org',
    'media2.wnyc.org',
    'megaphone.imgix.net',
    'pbcdn1.podbean.com',
    'ssl-static.libsyn.com',
    'storage.pinecast.net',
    'thumborcdn.acast.com',
    'whyy.org',
    'www.omnycontent.com',
    'ssl-static.libsyn.com']
  }
}

module.exports = nextConfig
