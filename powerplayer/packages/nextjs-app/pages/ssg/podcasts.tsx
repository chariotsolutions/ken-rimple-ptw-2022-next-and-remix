import React from 'react';
import { useRouter } from 'next/router';
import { FeedDetails } from '@powerplayer/shared';
import { ImageCard, CardContainer } from '@/components/card';
import { getFeeds } from '@/api/podcasts';
import Link from 'next/link';
import Head from 'next/head';

/**
 * SSG loading function
 */
export async function getStaticProps(context) {
  const feeds = await getFeeds();
  return { props: { feeds: feeds, optimizeImages: true  } };
}

export default function Podcasts({feeds, optimizeImages}) {

  const router = useRouter();

  if (!feeds) {
    return <p>No feed</p>
  }
  const cards = feeds.map((p:FeedDetails) =>
    (
      <ImageCard
        key={p.slug}
        optimizeImages={optimizeImages}
        image={p.imageUrl}>
        OPTIMIZE { optimizeImages }
        <div
          className="
            p-6 py-4 h-auto
            overflow-clip"
          dangerouslySetInnerHTML={{__html: p.description}} />
        <button className="
          absolute
          bottom-2
          right-2
          rounded-lg
          float-right
          align-bottom
          bg-blue-500
          h-auto
          p-3
          text-white
        ">
          { p.slug && <Link href={`podcast/${p.slug}?optimizeImages=${optimizeImages}`}>Show Details</Link> }
        </button>
      </ImageCard>
    ));
  return (
    <>
      <Head>
        <title>Next.js PowerPlayer - SSG Podcasts</title>
      </Head>
      <CardContainer title="Statically-generated podcasts" cols={3} cards={cards} />
    </>
  );
}
