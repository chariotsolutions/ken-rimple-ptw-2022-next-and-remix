import React from 'react';
import { useRouter } from 'next/router';
import { FeedDetails } from '@powerplayer/shared';
import { ImageCard, CardContainer } from '@/components/card';
import { getFeeds } from '@/api/podcasts';
import Link from 'next/link';
import Head from 'next/head';

/**
 * SSR loading function
 */
export async function getServerSideProps(context) {
  const data = await getFeeds();
  const optimizeImages = context.query.optimizeImages === 'true';
  console.log(`optimize images? ${optimizeImages}`);
  return { props: { feeds: [...data], optimizeImages}};
}

export default function Podcasts({feeds, optimizeImages}) {
  const router = useRouter();

  const cards = feeds.map((p:FeedDetails) =>
    <ImageCard
      key={p.slug}
      optimizeImages={optimizeImages}
      image={p.imageUrl}>
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
        <Link href={`/ssr/podcast/${p.slug}?optimizeImages=${optimizeImages}`}>Show Details</Link>
      </button>
    </ImageCard>);
  return (
    <>
      <Head>
        <title>Next.js PowerPlayer - SSR Podcasts</title>
      </Head>
      <CardContainer title="Server-side rendered podcasts" cols={3} cards={cards} />
    </>
  );
}
